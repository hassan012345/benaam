"use server";
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";
import { success } from "zod/v4";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const SignUp = async (
  fullname: string,
  email: string,
  phone: string,
  dob: string,
  password: string
) => {
  try {
    const result = await sql`
        INSERT INTO users (full_name, email, phone_number, dob, password)
        VALUES (${fullname}, ${email}, ${phone}, ${dob}, ${password})
        RETURNING id, full_name, email, phone_number, dob;
      `;
    return { success: true, user: result[0] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const addItem = async (formData: FormData) => {
  const rawFormData = {
    user_id: formData.get("user_id") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    location: formData.get("location") as string,
    reportDate: formData.get("report_date") as string,
    type: formData.get("type") as string,
    files: formData.getAll("file") as File[],
  };

  const bucketName = "item-images";
  const reportDate = new Date(rawFormData.reportDate);

  try {
    // Validate required fields
    if (!rawFormData.user_id || !rawFormData.name || !rawFormData.type) {
      throw new Error("Missing required fields");
    }

    // Insert item into database
    const response = await sql`
      INSERT INTO items (user_id, name, description, location, report_date, type)
      VALUES (
        ${rawFormData.user_id},
        ${rawFormData.name},
        ${rawFormData.description},
        ${rawFormData.location},
        ${reportDate.toISOString()},
        ${rawFormData.type}
      )
      RETURNING id
    `;

    const itemId = response[0]?.id;
    if (!itemId) {
      throw new Error("Failed to create item");
    }

    // Handle file uploads and store their URLs
    const uploadedFiles: string[] = [];

    for (const file of rawFormData.files) {
      if (file instanceof File && file.size > 0) {
        // Generate unique file name to avoid conflicts
        const timestamp = Date.now();
        const fileExtension = file.name.split(".").pop();
        const fileName = `${itemId}_${timestamp}.${fileExtension}`;
        const filePath = `public/${rawFormData.user_id}/${rawFormData.name}${fileName}`;

        // Upload file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error(`Failed to upload file ${file.name}:`, uploadError);
          continue;
        }

        // Get public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        if (urlData?.publicUrl) {
          uploadedFiles.push(urlData.publicUrl);

          // Insert file metadata into a files table (assuming it exists)
          await sql`
            INSERT INTO item_images (item_id,image_url,is_thumbnail)
            VALUES (${itemId},${urlData.publicUrl},true)
          `;
        }
      }
    }

    return {
      success: true,
      itemId,
      uploadedFiles,
    };
  } catch (error) {
    console.error("Error in addItem:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const getAllItems = async () => {
  try {
    const response = await sql`
      SELECT 
        items.id,
        items.name,
        items.description,
        items.type,
        items.location,
        items.report_date,
        items.user_Id,
        item_images.image_url AS image,
        users.full_name,
        items.created_at
      FROM items 
      INNER JOIN item_images ON items.id = item_images.item_id
      INNER JOIN users ON users.id = items.user_id
    `;
    console.log("getAllItems response:", response); // Debug log
    return { success: true, data: response}; // Ensure rows is returned
  } catch (err) {
    console.error("getAllItems error:", err); // Debug log
    return { success: false, error: err };
  }
};

export const addClaim = async (item_id:number,claimant_user_id:number,claim_details:string)=>{
  try{
    const response = await sql`
    INSERT INTO claims(item_id,claimant_user_id,claim_details)
    VALUES(${item_id},${claimant_user_id},${claim_details})
    `
    return {success:true, data:response}
  }
  catch(error){
    return {success:false,error:error}
  }
}

export const getClaims = async (item_id: number) => {
  const response = await sql<{ full_name: string; claim_details: string }[]>`
    SELECT users.full_name, claims.claim_details 
    FROM users
    INNER JOIN claims ON users.id = claims.claimant_user_id
    WHERE claims.item_id = ${item_id}
  `;
  return { success: true, data: response };
};

export const getUserItems = async (user_id: number)=>{
  const response = await sql`
  SELECT * from items where id=${user_id}
  `;
  return {success: true, data: response}
}

export const foundItem = async (userId: string, itemId: string) => {};
