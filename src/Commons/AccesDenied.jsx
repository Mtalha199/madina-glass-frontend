import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Lock } from 'lucide-react';

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center  h-[80vh] overflow-hidden from-gray-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950 px-4">
      <Card className="w-full max-w-xl rounded-3xl shadow-2xl border-none bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center gap-4 pt-8">
          <Lock className="h-20 w-20 text-red-500 dark:text-red-400 animate-pulse" />
          <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent dark:from-red-400 dark:via-pink-400 dark:to-purple-500">
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center px-6 pb-8 space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            You don’t have permission to access this page.
          </p>
          <p className="text-sm text-muted-foreground">
            Contact your system administrator for further access.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDenied;
