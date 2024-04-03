// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Youtube");

// Create a new document in the collection.
db.getCollection("users").insertMany([
    {
        username: "johndoe",
        email: "john@example.com",
        fullname: "John Doe",
        avatar: "https://example.com/john_avatar.jpg",
        coverimage: "https://example.com/john_cover.jpg",
        watchhistory: ["63e4d3b2f8d9e7b2c1f2d4e7", "63e4d3b2f8d9e7b2c1f2d4e8"],
        password: await bcrypt.hash("password123", 10),
    },
    {
        username: "janedoe",
        email: "jane@example.com",
        fullname: "Jane Doe",
        avatar: "https://example.com/jane_avatar.jpg",
        watchhistory: ["63e4d3b2f8d9e7b2c1f2d4e9", "63e4d3b2f8d9e7b2c1f2d4ea"],
        password: await bcrypt.hash("password456", 10),
    },
    {
        username: "bobsmith",
        email: "bob@example.com",
        fullname: "Bob Smith",
        avatar: "https://example.com/bob_avatar.jpg",
        coverimage: "https://example.com/bob_cover.jpg",
        watchhistory: ["63e4d3b2f8d9e7b2c1f2d4eb", "63e4d3b2f8d9e7b2c1f2d4ec"],
        password: await bcrypt.hash("password789", 10),
    },
    {
        username: "sarahjones",
        email: "sarah@example.com",
        fullname: "Sarah Jones",
        avatar: "https://example.com/sarah_avatar.jpg",
        watchhistory: ["63e4d3b2f8d9e7b2c1f2d4ed", "63e4d3b2f8d9e7b2c1f2d4ee"],
        password: await bcrypt.hash("password101112", 10),
    },
    {
        username: "michaelbrown",
        email: "michael@example.com",
        fullname: "Michael Brown",
        avatar: "https://example.com/michael_avatar.jpg",
        coverimage: "https://example.com/michael_cover.jpg",
        watchhistory: ["63e4d3b2f8d9e7b2c1f2d4ef", "63e4d3b2f8d9e7b2c1f2d4f0"],
        password: await bcrypt.hash("password131415", 10),
    },
    {
        username: "emilywilson",
        email: "emily@example.com",
        fullname: "Emily Wilson",
        avatar: "https://example.com/emily_avatar.jpg",
        watchhistory: ["63e4d3b2f8d9e7b2c1f2d4f1", "63e4d3b2f8d9e7b2c1f2d4f2"],
        password: await bcrypt.hash("password161718", 10),
    },
    {
        username: "davidthompson",
        email: "david@example.com",
        fullname: "David Thompson",
        avatar: "https://example.com/david_avatar.jpg",
        coverimage: "https://example.com/david_cover.jpg",
        watchhistory: ["63e4d3b2f8d9e7b2c1f2d4f3", "63e4d3b2f8d9e7b2c1f2d4f4"],
        password: await bcrypt.hash("password192021", 10),
    },
    {
        username: "oliviaroberts",
        email: "olivia@example.com",
        fullname: "Olivia Roberts",
        avatar: "https://example.com/olivia_avatar.jpg",
        watchhistory: ["63e4d3b2f8d9e7b2c1f2d4f5", "63e4d3b2f8d9e7b2c1f2d4f6"],
        password: await bcrypt.hash("password222324", 10),
    },
    {
        username: "jacobwilliams",
        email: "jacob@example.com",
        fullname: "Jacob Williams",
        avatar: "https://example.com/jacob_avatar.jpg",
        coverimage: "https://example.com/jacob_cover.jpg",
        watchhistory: ["63e4d3b2f8d9e7b2c1f2d4f7", "63e4d3b2f8d9e7b2c1f2d4f8"],
        password: await bcrypt.hash("password252627", 10),
    },
    {
        username: "sophiabrown",
        email: "sophia@example.com",
        fullname: "Sophia Brown",
        avatar: "https://example.com/sophia_avatar.jpg",
        watchhistory: ["63e4d3b2f8d9e7b2c1f2d4f9", "63e4d3b2f8d9e7b2c1f2d4fa"],
        password: await bcrypt.hash("password282930", 10),
    },
]);
