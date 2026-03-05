<?php
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\AttendanceController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/stats', [CourseController::class, 'stats']);
    Route::post('/logout', [AuthController::class, 'logout']);

     Route::get('/profile', function (Request $request) {
        return response()->json([
            'user' => $request->user()
        ]);
    });
        // Course Routes
    Route::get('/courses', [CourseController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

    // Enrollment Routes
    Route::post('/courses/{id}/enroll', [CourseController::class, 'enroll']);
    Route::get('/my-courses', [CourseController::class, 'myCourses']);
    Route::get('/courses/{id}/students', [CourseController::class, 'courseStudents']);
    Route::delete('/courses/{courseId}/students/{studentId}', 
    [CourseController::class, 'removeStudent']);

    // Attendance Routes
    Route::post('/attendance/mark', [AttendanceController::class, 'mark']);
    Route::get('/attendance/my', [AttendanceController::class, 'myAttendance']);
    Route::get('/attendance/course/{id}', [AttendanceController::class, 'courseAttendance']);
});
