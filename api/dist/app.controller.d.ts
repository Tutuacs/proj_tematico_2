export declare class AppController {
    getRoot(): {
        status: string;
        message: string;
        timestamp: string;
        version: string;
    };
    getHealth(): {
        status: string;
        message: string;
        uptime: number;
        timestamp: string;
        environment: string;
    };
    backWorking(): {
        status: string;
        message: string;
        data: {
            serverTime: string;
            platform: NodeJS.Platform;
            nodeVersion: string;
            uptime: string;
        };
    };
}
