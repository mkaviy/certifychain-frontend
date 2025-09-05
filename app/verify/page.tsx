'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Search, CheckCircle, AlertTriangle, XCircle, Shield } from 'lucide-react';

interface VerificationResult {
  status: 'verified' | 'flagged' | 'invalid';
  certificateId: string;
  txHash?: string;
  anomalyScore?: number;
  issueDate?: string;
  issuer?: string;
}

export default function VerifyPage() {
  const [certificateId, setCertificateId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!certificateId.trim()) {
      toast.error('Please enter a certificate ID');
      return;
    }

    setIsVerifying(true);
    setResult(null);

    try {
      // Mock API call - replace with actual backend endpoint
      setTimeout(() => {
        const randomStatus = Math.random();
        const mockResult: VerificationResult = {
          status: randomStatus > 0.7 ? 'verified' : randomStatus > 0.3 ? 'flagged' : 'invalid',
          certificateId: certificateId,
          txHash: `0x${Math.random().toString(16).substring(2, 66)}`,
          anomalyScore: Math.random() * 100,
          issueDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
          issuer: 'Tech Academy',
        };
        
        setResult(mockResult);
        setIsVerifying(false);
      }, 2000);

    } catch (error) {
      console.error('Error verifying certificate:', error);
      toast.error('Failed to verify certificate');
      setIsVerifying(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'verified':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="h-5 w-5" />,
          title: 'Certificate Verified',
          description: 'This certificate is authentic and valid',
        };
      case 'flagged':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <AlertTriangle className="h-5 w-5" />,
          title: 'Certificate Flagged',
          description: 'This certificate has been flagged for potential issues',
        };
      case 'invalid':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle className="h-5 w-5" />,
          title: 'Certificate Invalid',
          description: 'This certificate could not be verified or does not exist',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Shield className="h-5 w-5" />,
          title: 'Unknown Status',
          description: 'Unable to determine certificate status',
        };
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Certificate</h1>
        <p className="text-gray-600">Enter a certificate ID to check its authenticity and status</p>
      </div>

      <div className="space-y-6">
        {/* Search Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Certificate Verification</span>
            </CardTitle>
            <CardDescription>
              Enter the certificate ID you want to verify
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="certificateId">Certificate ID</Label>
              <Input
                id="certificateId"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="CERT-1234567890"
                className="font-mono"
              />
            </div>
            
            <Button 
              onClick={handleVerify} 
              disabled={isVerifying || !certificateId.trim()}
              size="lg" 
              className="w-full flex items-center justify-center space-x-2"
            >
              {isVerifying ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Verify Certificate</span>
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Verification Result */}
        {result && (
          <Card className={`border-2 ${getStatusConfig(result.status).color}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getStatusConfig(result.status).icon}
                <span>{getStatusConfig(result.status).title}</span>
              </CardTitle>
              <CardDescription className="text-inherit opacity-80">
                {getStatusConfig(result.status).description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label className="text-sm font-medium opacity-70">Certificate ID</Label>
                  <div className="mt-1 p-3 bg-white/50 rounded-md border font-mono text-sm">
                    {result.certificateId}
                  </div>
                </div>
                
                {result.status !== 'invalid' && (
                  <>
                    {result.txHash && (
                      <div>
                        <Label className="text-sm font-medium opacity-70">Transaction Hash</Label>
                        <div className="mt-1 p-3 bg-white/50 rounded-md border font-mono text-sm break-all">
                          {result.txHash}
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      {result.issueDate && (
                        <div>
                          <Label className="text-sm font-medium opacity-70">Issue Date</Label>
                          <div className="mt-1 p-3 bg-white/50 rounded-md border text-sm">
                            {result.issueDate}
                          </div>
                        </div>
                      )}
                      
                      {result.issuer && (
                        <div>
                          <Label className="text-sm font-medium opacity-70">Issuer</Label>
                          <div className="mt-1 p-3 bg-white/50 rounded-md border text-sm">
                            {result.issuer}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {result.anomalyScore !== undefined && (
                      <div>
                        <Label className="text-sm font-medium opacity-70">Anomaly Score</Label>
                        <div className="mt-1">
                          <Badge variant="secondary" className="bg-white/50">
                            {result.anomalyScore.toFixed(2)}%
                          </Badge>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-sm text-blue-800 mb-3">
              Certificate IDs are typically provided when a certificate is issued. If you don't have the ID, contact the certificate issuer.
            </p>
            <div className="text-xs text-blue-700">
              <strong>Verification Results:</strong><br />
              • ✅ <strong>Verified:</strong> Certificate is authentic and valid<br />
              • ⚠️ <strong>Flagged:</strong> Certificate may have issues requiring attention<br />
              • ❌ <strong>Invalid:</strong> Certificate cannot be verified or doesn't exist
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}