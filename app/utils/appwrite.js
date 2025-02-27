import { Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67bd9331000d09ce3cfc'); // Appwrite project ID

const storage = new Storage(client);

const BUCKET_ID = '67bd9fea002555b25e01'; // Bucket ID for CV storage

export { client, storage, BUCKET_ID };