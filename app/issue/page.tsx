'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { Upload, FileText, Shield, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

interface CertificateResult {
  certificateId: string;
  txHash: string;
  anomalyScore: number;
}

export default function IssuePage() {
  const { isConnected, signMessage } = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [result, setResult] = useState<CertificateResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setOcrText('');
    setResult(null);
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Mock OCR processing - replace with actual backend call
      setTimeout(() => {
        setOcrText(`Certificate of Achievement\n\nThis certifies that John Doe has successfully completed the Advanced Web Development Course with distinction.\n\nIssued on: ${new Date().toLocaleDateString()}\nInstitution: Tech Academy\nGrade: A+`);
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Failed to process file');
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.includes('image') || droppedFile.type === 'application/pdf')) {
      handleFileSelect(droppedFile);
    } else {
      toast.error('Please upload a PDF, JPG, or PNG file');
    }
  };

  const handleIssueCertificate = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!ocrText) {
      toast.error('Please upload and process a certificate first');
      return;
    }

    setIsIssuing(true);

    try {
      // Sign the OCR text with Metamask
      const signature = await signMessage(ocrText);
      
      // Mock backend call - replace with actual endpoint
      setTimeout(() => {
        const mockResult: CertificateResult = {
          certificateId: `CERT-${Date.now()}`,
          txHash: `0x${Math.random().toString(16).substring(2, 66)}`,
          anomalyScore: Math.random() * 100,
        };
        
        setResult(mockResult);
        toast.success('Certificate issued successfully!');
        setIsIssuing(false);
      }, 3000);

    } catch (error) {
      console.error('Error issuing certificate:', error);
      toast.error('Failed to issue certificate');
      setIsIssuing(false);
    }
  };

  const getAnomalyColor = (score: number) => {
    if (score < 30) return 'bg-green-100 text-green-800';
    if (score < 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getAnomalyIcon = (score: number) => {
    if (score < 30) return <CheckCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Issue Certificate</h1>
        <p className="text-gray-600">Upload a certificate file to process and issue on the blockchain</p>
      </div>

      <div className="space-y-6">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload Certificate</span>
            </CardTitle>
            <CardDescription>
              Supported formats: PDF, JPG, PNG (Max 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              
              {file ? (
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <span className="text-lg font-medium">{file.name}</span>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    Drop your certificate here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* OCR Preview */}
        {(isProcessing || ocrText) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>OCR Text Preview</span>
              </CardTitle>
              <CardDescription>
                Extracted text from your certificate
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner size="lg" />
                  <span className="ml-3 text-gray-600">Processing certificate...</span>
                </div>
              ) : (
                <Textarea
                  value={ocrText}
                  onChange={(e) => setOcrText(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                  placeholder="OCR text will appear here..."
                />
              )}
            </CardContent>
          </Card>
        )}

        {/* Issue Button */}
        {ocrText && !result && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Ready to Issue Certificate</h3>
                  <p className="text-sm text-gray-600">
                    This will create a blockchain transaction and issue your certificate
                  </p>
                </div>
                <Button
                  onClick={handleIssueCertificate}
                  disabled={isIssuing || !isConnected}
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  {isIssuing ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Issuing...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      <span>Issue Certificate</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Certificate Issued Successfully</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Certificate ID</Label>
                <div className="mt-1 p-3 bg-white rounded-md border font-mono text-sm">
                  {result.certificateId}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Transaction Hash</Label>
                <div className="mt-1 p-3 bg-white rounded-md border">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm break-all">{result.txHash}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/tx/${result.txHash}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Anomaly Score</Label>
                <div className="mt-1">
                  <Badge className={`${getAnomalyColor(result.anomalyScore)} flex items-center space-x-1 w-fit`}>
                    {getAnomalyIcon(result.anomalyScore)}
                    <span>{result.anomalyScore.toFixed(2)}%</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}