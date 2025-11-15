import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      status: 'ok',
      message: 'Backend is working! 🚀',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  @Get('health')
  getHealth() {
    return {
      status: 'healthy',
      message: 'Backend Vercel deployment is working perfectly! ✅',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    };
  }

  @Get('back_working')
  backWorking() {
    return {
      status: 'success',
      message: '🎉 Backend Vercel está funcionando perfeitamente!',
      data: {
        serverTime: new Date().toISOString(),
        platform: process.platform,
        nodeVersion: process.version,
        uptime: `${Math.floor(process.uptime())} seconds`,
      },
    };
  }
}
