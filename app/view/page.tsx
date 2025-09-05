'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Search, FileText, Code, ExternalLink, Calendar, Building, Hash } from 'lucide-react';

interface CertificateDetails {
  certificateId: string;
  ocrText: string;
  vcJson: string;
  txHash: string;
  issueDate: string;
  issuer: string;
  blockNumber: number;
  gasUsed: string;
}

export default function ViewPage() {
  const [certificateId, setCertificateId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<CertificateDetails | null>(null);

  const handleView = async () => {
    if (!certificateId.trim()) {
      toast.error('Please enter a certificate ID');
      return;
    }

    setIsLoading(true);
    setDetails(null);

    try {
      // Mock API call - replace with actual backend endpoint
      setTimeout(() => {
        const mockDetails: CertificateDetails = {
          certificateId: certificateId,
          ocrText: `Certificate of Achievement\n\nThis certifies that John Doe has successfully completed the Advanced Web Development Course with distinction.\n\nIssued on: ${new Date().toLocaleDateString()}\nInstitution: Tech Academy\nGrade: A+\n\nThis certificate demonstrates proficiency in:\n• React.js and Next.js development\n• TypeScript programming\n• Modern CSS and Tailwind\n• API integration and testing\n\nAuthorized by:\nDr. Sarah Johnson, Course Director\nTech Academy`,
          vcJson: JSON.stringify({
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            "type": ["VerifiableCredential", "CertificateCredential"],
            "issuer": "did:ethr:0x1234567890abcdef",
            "issuanceDate": new Date().toISOString(),
            "credentialSubject": {
              "id": "did:ethr:0xabcdef1234567890",
              "name": "John Doe",
              "course": "Advanced Web Development",
              "grade": "A+",
              "institution": "Tech Academy"
            },
            "proof": {
              "type": "EthereumEip712Signature2021",
              "created": new Date().toISOString(),
              "verificationMethod": "did:ethr:0x1234567890abcdef#controller",
              "proofValue": "0x" + Math.random().toString(16).substring(2, 130)
            }
          }, null, 2),
          txHash: `0x${Math.random().toString(16).substring(2, 66)}`,
          issueDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
          issuer: 'Tech Academy',
          blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
          gasUsed: (Math.random() * 100000 + 21000).toFixed(0),
        };
        
        setDetails(mockDetails);
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      console.error('Error fetching certificate details:', error);
      toast.error('Failed to fetch certificate details');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">View Certificate</h1>
        <p className="text-gray-600">Enter a certificate ID to view its complete details and blockchain information</p>
      </div>

      <div className="space-y-6">
        {/* Search Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Certificate Lookup</span>
            </CardTitle>
            <CardDescription>
              Enter the certificate ID to view its details
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
              onClick={handleView} 
              disabled={isLoading || !certificateId.trim()}
              size="lg" 
              className="w-full flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>View Certificate</span>
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Certificate Details */}
        {details && (
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Certificate Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Hash className="h-3 w-3" />
                      <span>Certificate ID</span>
                    </Label>
                    <div className="mt-1 p-2 bg-gray-50 rounded-md font-mono text-sm">
                      {details.certificateId}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Issue Date</span>
                    </Label>
                    <div className="mt-1 p-2 bg-gray-50 rounded-md text-sm">
                      {details.issueDate}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Building className="h-3 w-3" />
                      <span>Issuer</span>
                    </Label>
                    <div className="mt-1 p-2 bg-gray-50 rounded-md text-sm">
                      {details.issuer}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OCR Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>OCR Extracted Text</span>
                </CardTitle>
                <CardDescription>
                  Text extracted from the original certificate document
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={details.ocrText}
                  readOnly
                  rows={12}
                  className="font-mono text-sm resize-none"
                />
              </CardContent>
            </Card>

            {/* VC JSON */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Verifiable Credential (VC) JSON</span>
                </CardTitle>
                <CardDescription>
                  Structured credential data in W3C Verifiable Credential format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{details.vcJson}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Information */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5" />
                  <span>Blockchain Transaction</span>
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Immutable record on the Ethereum blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-blue-900">Transaction Hash</Label>
                  <div className="mt-1 flex items-center justify-between p-3 bg-white rounded-md border">
                    <span className="font-mono text-sm break-all">{details.txHash}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/tx/${details.txHash}`, '_blank')}
                      className="ml-2 flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-blue-900">Block Number</Label>
                    <div className="mt-1 p-3 bg-white rounded-md border text-sm">
                      #{details.blockNumber.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-blue-900">Gas Used</Label>
                    <div className="mt-1 p-3 bg-white rounded-md border text-sm">
                      {parseInt(details.gasUsed).toLocaleString()} gas
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}