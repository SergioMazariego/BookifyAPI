import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        // Get the book ID from the request event
        const bookId = event.pathParameters.id;
        
        // Parse the request body to extract the updated book data
        const updatedBookData = JSON.parse(event.body);

        // Prepare the update expression and attribute values
        const updateParams = {
            TableName: "books",
            Key: {
                id: bookId
            },
            UpdateExpression: "SET #name = :name, #author = :author, #year = :year, #genre = :genre",
            ExpressionAttributeNames: {
                "#name": "name",
                "#author": "author",
                "#year": "year",
                "#genre": "genre"
            },
            ExpressionAttributeValues: {
                ":name": updatedBookData.name,
                ":author": updatedBookData.author,
                ":year": updatedBookData.year,
                ":genre": updatedBookData.genre
            }
        };

        // Call DynamoDB's updateCommand to update the book by its ID
        await ddbDocClient.send(new UpdateCommand(updateParams));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Book updated successfully" }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
