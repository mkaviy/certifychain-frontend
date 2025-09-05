import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileCheck, Search, Upload, Zap, Lock } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Certificates are secured by blockchain technology, ensuring immutability and transparency.',
    },
    {
      icon: FileCheck,
      title: 'Instant Verification',
      description: 'Verify any certificate authenticity instantly with our advanced verification system.',
    },
    {
      icon: Search,
      title: 'Easy Viewing',
      description: 'Access complete certificate details including OCR text and blockchain transactions.',
    },
    {
      icon: Zap,
      title: 'Fast Issuance',
      description: 'Issue certificates quickly with automated OCR processing and blockchain signing.',
    },
    {
      icon: Lock,
      title: 'Tamper Proof',
      description: 'Once issued, certificates cannot be altered, ensuring permanent authenticity.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Secure Certificate
          <span className="text-blue-600 block">Management</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Issue, verify, and manage certificates on the blockchain with advanced OCR processing and tamper-proof security.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link href="/issue" className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Issue Certificate</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
            <Link href="/verify" className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5" />
              <span>Verify Certificate</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
            <CardContent className="p-6 text-center">
              <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Issue New Certificate</h3>
              <p className="text-gray-600 text-sm mb-4">Upload and process a new certificate</p>
              <Button asChild className="w-full">
                <Link href="/issue">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
            <CardContent className="p-6 text-center">
              <FileCheck className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Verify Certificate</h3>
              <p className="text-gray-600 text-sm mb-4">Check certificate authenticity</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/verify">Verify Now</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors">
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">View Certificate</h3>
              <p className="text-gray-600 text-sm mb-4">Access certificate details</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/view">View Details</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}