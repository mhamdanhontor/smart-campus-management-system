<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    // Get all courses
    public function index()
    {
        $courses = Course::with('creator')->get();
        return response()->json($courses);
    }

    // Create new course (Admin only)
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized. Admins only.'
            ], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'code' => 'required|string|unique:courses',
            'credit_hours' => 'required|integer'
        ]);

        $course = Course::create([
            'title' => $request->title,
            'description' => $request->description,
            'code' => $request->code,
            'credit_hours' => $request->credit_hours,
            'created_by' => $request->user()->id
        ]);

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course
        ]);
    }

    // Show single course
    public function show($id)
    {
        $course = Course::with('creator')->findOrFail($id);
        return response()->json($course);
    }

    // Update course (Admin only)
    public function update(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized. Admins only.'
            ], 403);
        }

        $course = Course::findOrFail($id);

        $course->update($request->only([
            'title',
            'description',
            'code',
            'credit_hours'
        ]));

        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course
        ]);
    }

    // Delete course (Admin only)
    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized. Admins only.'
            ], 403);
        }

        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }

    // Student enroll in a course
public function enroll(Request $request, $courseId)
{
    $user = $request->user();

    if ($user->role !== 'student') {
        return response()->json([
            'message' => 'Only students can enroll.'
        ], 403);
    }

    $course = Course::findOrFail($courseId);

    if ($user->enrolledCourses()->where('course_id', $courseId)->exists()) {
        return response()->json([
            'message' => 'Already enrolled in this course.'
        ], 400);
    }

    $user->enrolledCourses()->attach($courseId);

    return response()->json([
        'message' => 'Enrollment successful.'
    ]);
}


// Get courses enrolled by student
public function myCourses(Request $request)
{
    $user = $request->user();

    if ($user->role !== 'student') {
        return response()->json([
            'message' => 'Only students can view enrolled courses.'
        ], 403);
    }

    return response()->json(
        $user->enrolledCourses()->with('creator')->get()
    );
}


// Admin: View students of a course
public function courseStudents(Request $request, $courseId)
{
    if ($request->user()->role !== 'admin') {
        return response()->json([
            'message' => 'Unauthorized. Admins only.'
        ], 403);
    }

    $course = Course::with('students')->findOrFail($courseId);

    return response()->json($course->students);
}
public function removeStudent(Request $request, $courseId, $studentId)
{
    if ($request->user()->role !== 'admin') {
        return response()->json([
            'message' => 'Unauthorized. Admins only.'
        ], 403);
    }

    $course = Course::findOrFail($courseId);

    $course->students()->detach($studentId);

    return response()->json([
        'message' => 'Student removed successfully.'
    ]);
}
public function stats(Request $request)
{
    if ($request->user()->role !== 'admin') {
        return response()->json([
            'message' => 'Unauthorized. Admins only.'
        ], 403);
    }

    $totalCourses = \App\Models\Course::count();
    $totalStudents = \App\Models\User::where('role', 'student')->count();
    $totalAttendance = \App\Models\Attendance::count();

    $present = \App\Models\Attendance::where('status', true)->count();
    $absent = \App\Models\Attendance::where('status', false)->count();

    return response()->json([
        'total_courses' => $totalCourses,
        'total_students' => $totalStudents,
        'total_attendance' => $totalAttendance,
        'present' => $present,
        'absent' => $absent
    ]);
}
}