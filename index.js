// Importing required modules
const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Sample student data stored in JSON format
const studentsData = [
    {
        "student_id": "1",
        "name": "Alice Johnson",
        "marks": {
            "math": 85,
            "science": 90,
            "english": 78,
            "history": 88,
            "geography": 92
        },
        "total": 433
    },
    {
        "student_id": "2",
        "name": "Bob Smith",
        "marks": {
            "math": 80,
            "science": 85,
            "english": 75,
            "history": 90,
            "geography": 80
        },
        "total": 410
    },
    {
        "student_id": "3",
        "name": "Charlie Davis",
        "marks": {
            "math": 88,
            "science": 84,
            "english": 79,
            "history": 87,
            "geography": 77
        },
        "total": 415
    },
    {
        "student_id": "4",
        "name": "Diana Spencer",
        "marks": {
            "math": 72,
            "science": 65,
            "english": 70,
            "history": 68,
            "geography": 75
        },
        "total": 350
    }
];

// API Endpoint: POST /students/above-threshold
app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body;

    // Validate the input
    if (typeof threshold !== 'number' || threshold < 0) {
        return res.status(400).json({
            error: "'threshold' must be a positive number."
        });
    }

    // Filter students whose total marks exceed the threshold
    const filteredStudents = studentsData
        .filter(student => student.total > threshold)
        .map(student => ({
            name: student.name,
            total: student.total
        }));

    // Prepare the response
    const response = {
        count: filteredStudents.length,
        students: filteredStudents
    };

    // Return the response
    res.status(200).json(response);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});