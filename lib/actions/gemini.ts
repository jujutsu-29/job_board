'use server'

import { getJobDetailsFromUrl } from "../server/gemini";

export async function extractJobDetailsFromUrl(url: string) {
    try {
        const jobData = await getJobDetailsFromUrl(url);
        return { success: true, data: jobData };
    } catch (error) {
        console.error("Error getting job details from URL:", error);
        return { success: false, error: "Failed to get job details from URL." };
    }
}