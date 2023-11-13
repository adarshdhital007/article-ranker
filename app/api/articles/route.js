import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("test");
        const articles = database.collection("articles");
        const query = {};
        const result = await articles.find(query).toArray();

        return NextResponse.json({ articles: result });
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch articles" });
    } finally {
        await client.close();
    }
}

export async function POST(request) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        const { name, link } = await request.json(); 

        await client.connect();
        const database = client.db("test");
        const articles = database.collection("articles");

        const newArticle = {
            name,
            link,
            votes: 0
        };

        const result = await articles.insertOne(newArticle); 
        const updatedArticles = await articles.find({}).toArray();

        return NextResponse.json({ success: true, articles: updatedArticles });
    } catch (error) {
        console.error("Error adding a new Article:", error);
        return NextResponse.json({ success: false, error: "Failed to add a new Article" });
    } finally {
        await client.close();
    }
}

export async function PUT(request) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        const { articleId, voteType } = await request.json();

        await client.connect();
        const database = client.db("test");
        const articles = database.collection("articles");

        const filter = { _id: new ObjectId(articleId) };
        const update = voteType === 'upvote' ? { $inc: { votes: 1 } } : { $inc: { votes: -1 } };

        const result = await articles.updateOne(filter, update);

        if (result.modifiedCount === 0) {
            return NextResponse.json({ success: false, message: "Article not found" });
        }

        const updatedArticles = await articles.find({}).toArray();

        return NextResponse.json({ success: true, articles: updatedArticles });
    } catch (error) {
        console.error("Error voting for the Article:", error);
        return NextResponse.json({ success: false, error: "Failed to vote for the Article" });
    } finally {
        await client.close();
    }
}
