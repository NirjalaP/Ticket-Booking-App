import User  from "../models/User.js";
import { Inngest } from "inngest";

console.log("Has INNGEST_SIGNING_KEY:", !!process.env.INNGEST_SIGNING_KEY);

// Create a client to send and receive events
export const inngest = new Inngest({ 
    id: "movie-ticket-booking",
signingKey: process.env.INNGEST_SIGNING_KEY,});


//Inngest function to save user data to a adatabase
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clerk/user.created'},

    async ({event})=>{
            const {id, first_name, last_name, email_addresses, image_url} = event.data
            const userData = {
                _id:id,
                email:email_addresses[0].email_address,
                name: first_name + ' ' + last_name,
                image: image_url
            }
            await User.create(userData)
    }

)

// Inngest function to delete user form database
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-from-clerk'},
    {event: 'clerk/user.deleted'},

    async ({event})=>{
            const {id} = event.data
            await User.findByIdAndDelete(id)
    }

)

// Inngest function to update user form database
const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event: 'clerk/user.updated'},

    async ({event})=>{
            const {id, first_name, last_name, email_addresses, image_url} = event.data
            const userData = {
                _id:id,
                email:email_addresses[0].email_address,
                name: first_name + ' ' + last_name,
                image: image_url
            }
            await User.findByIdAndUpdate(id, userData)

    }

)



export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];