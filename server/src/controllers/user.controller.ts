import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        data: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' }
        ]
    });
};
