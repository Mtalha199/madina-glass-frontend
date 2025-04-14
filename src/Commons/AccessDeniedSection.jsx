import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Lock } from 'lucide-react';

const AccessDeniedSection = () => {
  return (
    <div className="flex items-center justify-center w-full overflow-hidden from-gray-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-slate-900 dark:to-purple-950 p-4">
      <Card className="w-full rounded-3xl shadow-2xl border-none bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex flex-row items-center">
          <div className="flex-shrink-0 flex items-center justify-center p-6 md:p-8">
            <Lock className="h-16 w-16 text-red-500 dark:text-red-400 animate-pulse" />
          </div>
          
          <div className="flex-grow">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-left bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent dark:from-red-400 dark:via-pink-400 dark:to-purple-500">
                Access Denied
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-2">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                You don't have permission to access this page.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact your system administrator for further access.
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccessDeniedSection;