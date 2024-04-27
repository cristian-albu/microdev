import { z } from "zod";

// User
export const Parent = z.object({
    parent_id: z.number(),
    name: z.string().max(63),
    email: z.string().max(255),
});

export type T_Parent = z.infer<typeof Parent>;

export const Parents = `--sql
CREATE TABLE parents(
        parent_id SERIAL PRIMARY KEY,
        name VARCHAR(63) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
);
`;

// Students
export const Student = z.object({
    student_id: z.number(),
    name: z.string().max(63),
    age: z.number(),
    user_id: z.number(),
});

export type T_Student = z.infer<typeof Student>;

export const Students = `--sql
CREATE TABLE students(
        student_id SERIAL PRIMARY KEY,
        name VARCHAR(63) NOT NULL,
        age INT,
        parent_id INT REFERENCES parents(parent_id)
);
`;
