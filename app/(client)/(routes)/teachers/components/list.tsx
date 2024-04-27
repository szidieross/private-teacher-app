"use client"

import React, { useEffect, useState } from 'react';
import Item from './item';
import useUsersService from '@/app/(client)/services/user.service';
import { UserModel } from '@/app/api/models/user.model';

const List = () => {
    const { getUsers } = useUsersService();
    const [users, setUsers] = useState<UserModel[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUsers = await getUsers();
                console.log(fetchedUsers)
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();

        // return () => {
        // };
    }, [getUsers]);

    return (
        <>
            {users && users.map((user, index) => (
                <Item key={index} />
            ))}
        </>
    );
};

export default List;
