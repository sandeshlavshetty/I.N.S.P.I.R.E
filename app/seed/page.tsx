'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function SeedDemoPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<any>(null);

    const handleSeedData = async () => {
        setLoading(true);
        setMessage('');
        setError('');
        setResult(null);

        try {
            const response = await fetch('/api/seed-demo', {
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✅ Demo data seeded successfully!');
                setResult(data);
            } else {
                setError(`❌ Error: ${data.error}`);
            }
        } catch (err) {
            setError(`❌ Failed to seed data: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGetInfo = async () => {
        try {
            const response = await fetch('/api/seed-demo');
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(`Failed to fetch info: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="max-w-2xl mx-auto py-8">
                <Card className="border-2">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                        <CardTitle className="text-2xl">🌱 Demo Data Seeding</CardTitle>
                        <CardDescription className="text-blue-100">
                            Populate the database with authentic demo data for testing all features
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-6">
                        {/* Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-900 mb-2">📋 What will be created:</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>✓ 5 authentic demo users (including 1 admin)</li>
                                <li>✓ 7 realistic projects across different domains</li>
                                <li>✓ 4 active and pending polls with vote data</li>
                            </ul>
                        </div>

                        {/* Demo Credentials */}
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h3 className="font-semibold text-amber-900 mb-2">🔐 Demo Login Credentials:</h3>
                            <div className="text-sm text-amber-800 space-y-2 font-mono">
                                <div>
                                    <p className="font-semibold">Student Users:</p>
                                    <p>priya.sharma@example.com | TestPass123!</p>
                                    <p>rajesh.patel@example.com | TestPass123!</p>
                                    <p>ananya.verma@example.com | TestPass123!</p>
                                    <p>vikram.kumar@example.com | TestPass123!</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Admin User:</p>
                                    <p>admin@example.com | AdminPass123!</p>
                                </div>
                            </div>
                        </div>

                        {/* Alerts */}
                        {message && (
                            <Alert className="bg-green-50 border-green-200">
                                <AlertDescription className="text-green-800">{message}</AlertDescription>
                            </Alert>
                        )}

                        {error && (
                            <Alert className="bg-red-50 border-red-200">
                                <AlertDescription className="text-red-800">{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Results */}
                        {result && result.data && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 className="font-semibold text-green-900 mb-2">✨ Seeded Data Summary:</h3>
                                <div className="text-sm text-green-800 space-y-1">
                                    <p>📝 Users created: {result.data.users}</p>
                                    <p>📚 Projects created: {result.data.projects}</p>
                                    <p>🗳️ Polls created: {result.data.polls}</p>
                                </div>
                            </div>
                        )}

                        {/* Credentials Display */}
                        {result && result.demoCredentials && (
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                <h3 className="font-semibold text-slate-900 mb-2">Available Test Accounts:</h3>
                                <div className="text-sm text-slate-700 space-y-1">
                                    {result.demoCredentials.map((cred: any, idx: number) => (
                                        <p key={idx}>
                                            <span className="font-semibold">{cred.email}</span> ({cred.role})
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                onClick={handleSeedData}
                                disabled={loading}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                                size="lg"
                            >
                                {loading ? '⏳ Seeding...' : '🚀 Seed Demo Data'}
                            </Button>
                            <Button
                                onClick={handleGetInfo}
                                variant="outline"
                                className="flex-1"
                                size="lg"
                            >
                                ℹ️ View Credentials
                            </Button>
                        </div>

                        {/* Warning */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                            <p className="font-semibold mb-1">⚠️ Warning:</p>
                            <p>This will clear existing data and replace it with demo data. Use this only for testing purposes.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
