<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Course;
use App\Models\User;

class AttendanceController extends Controller
{
    // Admin marks attendance
    public function mark(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized. Admins only.'
            ], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'date' => 'required|date',
            'status' => 'required|boolean'
        ]);

        $attendance = Attendance::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'date' => $request->date,
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'Attendance marked successfully',
            'attendance' => $attendance
        ]);
    }

    // Student views own attendance
    public function myAttendance(Request $request)
    {
        if ($request->user()->role !== 'student') {
            return response()->json([
                'message' => 'Only students can view their attendance.'
            ], 403);
        }

        $attendance = Attendance::with('course')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json($attendance);
    }

    // Admin views attendance for a course
    public function courseAttendance(Request $request, $courseId)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized. Admins only.'
            ], 403);
        }

        $attendance = Attendance::with('user')
            ->where('course_id', $courseId)
            ->get();

        return response()->json($attendance);
    }
}