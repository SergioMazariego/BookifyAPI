import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        // Extract the book ID from the request event
        const bookId = event.pathParameters.id;

        // Call DynamoDB's deleteItemCommand to delete the book by its ID
        await ddbDocClient.send(new DeleteItemCommand ({
            TableName: "books",
            Key: {
                id: { S: bookId}
            }
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Book deleted successfully" }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
 