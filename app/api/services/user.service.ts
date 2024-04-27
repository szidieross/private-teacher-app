import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";
import { UserModel } from "../models/user.model"
import { UserDto } from "../dtos/user.dto";
import { toUserModel } from "../mappers/user.mapper";
import { RowDataPacket } from "mysql2";

// export async function GET(
//     request: NextRequest,) {
//     try {
//         const db = await pool.getConnection()
//         const query = 'select * from users'
//         const [rows] = await db.execute(query)
//         db.release()

//         return NextResponse.json(rows)
//     } catch (error) {
//         return NextResponse.json({
//             error: error
//         }, { status: 500 })
//     }
// }

export const getUsers = async (): Promise<UserModel[]> => {
    try {
        const db = await pool.getConnection();
        const query = 'SELECT * FROM users';
        const [rows] = await db.execute(query);
        db.release();

        if (!Array.isArray(rows)) {
            throw new Error('Query result is not an array');
        }

        const data: UserDto[] = (rows as any).map((row: any) => {
            return {
                user_id: row.user_id,
                username: row.username,
                password: row.password,
                email: row.email,
                phone: row.phone,
                created_at: row.created_at,
                first_name: row.first_name,
                last_name: row.last_name,
                role: row.role,
            };
        });

        const users:UserModel[] = data.map((row: UserDto) => {
            return toUserModel(row);
        });



        // const data = NextResponse.json(rows)

        // const users: UserModel[] = data.map((row: UserDto) => {
        //     return toUserModel(row);
        // });

        return users;
    } catch (error) {
        // Hiba esetén visszatérünk egy üres tömbbel
        console.error('Error fetching users:', error);
        return [];
    }
};

// export const getUsers2 = async (): Promise<UserModel[]> => {
//     // async function GET(
//     const data: UserDto[] = async GET(
//         request: NextRequest,) {
//         try {
//             const db = await pool.getConnection()
//             const query = 'select * from users'
//             const [rows] = await db.execute(query)
//             db.release()

//             return NextResponse.json(rows)
//         } catch (error) {
//             return NextResponse.json({
//                 error: error
//             }, { status: 500 })
//         }
//     }

//     // const { data } = await externalApi.get<{
//     //     community?: CmsCommunityDTO[];
//     // }>(`${environments.api.cms}/projects`);

//     // const mergedCommunities = [
//     //     ...(data.community ?? []),
//     // ];

//     // return mergedCommunities.map((item) => cmsCommunityModelMapper(item, environments));
//     return data.map((item: UserDto) => toUserModel(item));
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const getCollectionById = async (slug: string, id: string): Promise<CmsCollectionDTO> => {
//   const environments = await getEnvironments();
//   const response = await externalApi.get<CmsCollectionDTO>(
//     `${environments.api.cms}/projects/${slug}/collections/${id}`
//   );
//   return response.data;
// };

// export const getCommunityBySlug = async (slug: string): Promise<CmsCommunityDTO> => {
//   const environments = await getEnvironments();
//   const response = await externalApi.get<CmsCommunityDTO>(
//     `${environments.api.cms}/projects/${slug}`
//   );
//   return response.data;
// };

// export const getWhitelistByUrl = async (whitelistUrl: string): Promise<WhitelistDTO> => {
//   const environments = await getEnvironments();
//   const response = await externalApi.get<WhitelistDTO>(
//     `${environments.api.cms}/storage/app/media${whitelistUrl}`
//   );
//   return response.data;
// };

// export const getCommunityById = async (communityId: number): Promise<CmsCommunityByIdModel> => {
//   const environments = await getEnvironments();
//   try {
//     const { data } = await externalApi.get<CmsCommunityByIdDTO>(
//       `${environments.api.cms}/community-by-id/${communityId}`
//     );
//     return communityByIdMapper(data);
//   } catch (error) {
//     throw Error("Error with getCommunityById");
//   }
// };

// export const getReviewCommunity = async (
//   sessionId: string,
//   status: ReviewStatus
// ): Promise<ReviewCommunityDTO | undefined> => {
//   try {
//     const environments = await getEnvironments();
//     const response = await externalApi.get<ReviewCommunityDTO>(
//       `${environments.api.cms}/review/projects/${status}/${sessionId}`
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }

//   return undefined;
// };