// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Youtube");

// Create a new document in the collection.
db.getCollection("videos").insertMany([
    {
        videofile: "https://example.com/video1.mp4",
        thumbnail: "https://example.com/video1_thumb.jpg",
        description: "Introduction to React",
        duration: 3600, // 1 hour
        views: 12345,
        ispublished: true,
        owner: "63e4d3b2f8d9e7b2c1f2d4e5",
    },
    {
        videofile: "https://example.com/video2.mp4",
        thumbnail: "https://example.com/video2_thumb.jpg",
        description: "Node.js Fundamentals",
        duration: 7200, // 2 hours
        views: 54321,
        ispublished: false,
        owner: "63e4d3b2f8d9e7b2c1f2d4e6",
    },
    {
        videofile: "https://example.com/video3.mp4",
        thumbnail: "https://example.com/video3_thumb.jpg",
        description: "MongoDB Querying",
        duration: 5400, // 1.5 hours
        views: 23456,
        ispublished: true,
        owner: "63e4d3b2f8d9e7b2c1f2d4e5",
    },
    {
        videofile: "https://example.com/video4.mp4",
        thumbnail: "https://example.com/video4_thumb.jpg",
        description: "Vue.js Introduction",
        duration: 4800, // 1.3 hours
        views: 8765,
        ispublished: true,
        owner: "63e4d3b2f8d9e7b2c1f2d4e7",
    },
    {
        videofile: "https://example.com/video5.mp4",
        thumbnail: "https://example.com/video5_thumb.jpg",
        description: "Python for Data Science",
        duration: 10800, // 3 hours
        views: 45678,
        ispublished: true,
        owner: "63e4d3b2f8d9e7b2c1f2d4e8",
    },
    {
        videofile: "https://example.com/video6.mp4",
        thumbnail: "https://example.com/video6_thumb.jpg",
        description: "JavaScript Algorithms",
        duration: 6300, // 1.75 hours
        views: 9876,
        ispublished: false,
        owner: "63e4d3b2f8d9e7b2c1f2d4e9",
    },
    {
        videofile: "https://example.com/video7.mp4",
        thumbnail: "https://example.com/video7_thumb.jpg",
        description: "React Native for Mobile Apps",
        duration: 8100, // 2.25 hours
        views: 34567,
        ispublished: true,
        owner: "63e4d3b2f8d9e7b2c1f2d4e5",
    },
    {
        videofile: "https://example.com/video8.mp4",
        thumbnail: "https://example.com/video8_thumb.jpg",
        description: "Django Web Development",
        duration: 9000, // 2.5 hours
        views: 67890,
        ispublished: true,
        owner: "63e4d3b2f8d9e7b2c1f2d4e6",
    },
    {
        videofile: "https://example.com/video9.mp4",
        thumbnail: "https://example.com/video9_thumb.jpg",
        description: "Introduction to Machine Learning",
        duration: 7500, // 2.08 hours
        views: 12345,
        ispublished: false,
        owner: "63e4d3b2f8d9e7b2c1f2d4e7",
    },
    {
        videofile: "https://example.com/video10.mp4",
        thumbnail: "https://example.com/video10_thumb.jpg",
        description: "Docker for Developers",
        duration: 5700, // 1.58 hours
        views: 56789,
        ispublished: true,
        owner: "63e4d3b2f8d9e7b2c1f2d4e8",
    },
]);
