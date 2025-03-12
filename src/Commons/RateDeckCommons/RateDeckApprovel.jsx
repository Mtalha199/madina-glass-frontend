import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Download, FileText } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const RateDeckApproval = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Company Logo and Name */}
        <div className="flex flex-col items-center mb-2">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white text-2xl font-bold">RC</span>
          </div>
          <h1 className="text-xl font-bold text-blue-600">RateCloud Solutions</h1>
        </div>
        
        {/* Success Banner */}
        <div className="bg-green-500 text-white rounded-lg p-6 flex items-center gap-4 shadow-lg">
          <CheckCircle2 size={36} />
          <div>
            <h2 className="text-xl font-bold">Approved!</h2>
            <p className="opacity-90">Your rate deck has been approved</p>
          </div>
        </div>
        
        {/* Main Card */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Rate Deck Details</CardTitle>
            <CardDescription>Your submission has been reviewed and accepted</CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            <div className="space-y-4">
              {/* File Information */}
              <div className="bg-blue-50 rounded-md p-4 mb-4 flex items-center">
                <FileText className="text-blue-500 mr-3" size={24} />
                <div>
                  <h3 className="font-medium">Standard_Rate_Deck_Q2_2025.xlsx</h3>
                  <p className="text-sm text-slate-500">2.4 MB • Excel Spreadsheet</p>
                </div>
              </div>
            
              {/* Summary Details */}
              <div className="bg-slate-50 rounded-md p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Submission Date:</span>
                  <span>March 13, 2025</span>
                </div>
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Approval Date:</span>
                  <span>March 13, 2025</span>
                </div>
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Effective Date:</span>
                  <span className="font-medium text-blue-600">April 1, 2025</span>
                </div>
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Reference Number:</span>
                  <span className="font-mono">RD-2025-0313</span>
                </div>
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Status:</span>
                  <Badge variant="success" className="bg-green-500 hover:bg-green-500">Approved</Badge>
                </div>
              </div>
              
              {/* Terms and Conditions */}
              <div className="mt-4 space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={termsAccepted}
                    onCheckedChange={() => setTermsAccepted(!termsAccepted)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-600">
                    I acknowledge that by downloading this rate deck, I agree to implement these rates 
                    effective April 1, 2025, and comply with all applicable terms and conditions as 
                    outlined in our service agreement.
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
            <Button 
              className="w-full py-6 bg-green-500 hover:bg-green-600 shadow-md flex items-center justify-center"
              disabled={!termsAccepted}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Rate Deck
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full py-3 border-green-500 text-green-600 hover:bg-green-50"
              disabled={!termsAccepted}
            >
              I Accept
            </Button>
          </CardFooter>
        </Card>
        
        {/* Footer */}
        <div className="text-center text-sm text-slate-500">
          This is an automated notification. Please contact support if you have any questions.
        </div>
      </div>
    </div>
  );
};

export default RateDeckApproval;