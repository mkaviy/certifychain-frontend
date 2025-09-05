'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, Shield, FileCheck, Search, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/issue', label: 'Issue', icon: Shield },
    { href: '/verify', label: 'Verify', icon: FileCheck },
    { href: '/view', label: 'View', icon: Search },
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CertifyChain</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      pathname === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{formatAddress(account!)}</span>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className="flex items-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center p-2 text-xs',
                  pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-600'
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}