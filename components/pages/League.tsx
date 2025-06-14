'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Search,
  Filter,
  ArrowRight,
  Star,
  MapPin,
  Shield,
  MoreHorizontal,
  Grid3X3,
  List,
  Eye,
  Heart,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { League, Team } from '@/types';

export default function LeaguePage({ league, teams }: { league: League, teams: Team[] }) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('points');
  const [activeTab, setActiveTab] = useState('standings');

  // Find the current league
  const leagueTeams = teams?.filter(team => team.league_id === league?.id) || [];

  const filteredStandings = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStandings = [...filteredStandings].sort((a, b) => {
    switch (sortBy) {
      case 'points':
        return b.points - a.points;
      case 'gd':
        return b.goals_for - b.goals_against - (a.goals_for - a.goals_against);
      case 'gf':
        return b.goals_for - a.goals_for;
      default:
        return b.points - a.points;
    }
  });

  const getPositionColor = (position: number) => {
    if (position <= 4) return 'text-blue-600 bg-blue-50'; // Champions League
    if (position <= 6) return 'text-orange-600 bg-orange-50'; // Europa League
    if (position >= teams.length - 2) return 'text-red-600 bg-red-50'; // Relegation
    return 'text-gray-600 bg-gray-50';
  };

  if (!league) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">League not found</h2>
            <Link href="/leagues">
              <Button className="mt-4">Back to Leagues</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/leagues" className="hover:text-gray-700">Leagues</Link>
              <span>/</span>
              <span>{league.name}</span>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{league.name}</h1>
                <p className="text-gray-600 mb-4">{league.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    {league.sport}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {league.season}
                  </div>
                  <Badge variant={league.status === 'active' ? 'default' : 'secondary'}>
                    {league.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* League Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Teams</p>
                    <p className="text-3xl font-bold">{teams.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Matches Played</p>
                    <p className="text-2xl font-bold">25</p>
                  </div>
                  <Trophy className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Total Goals</p>
                    <p className="text-2xl font-bold">{teams.reduce((sum, team) => sum + team.goals_for, 0)}</p>
                  </div>
                  <Shield className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Top Team</p>
                    <p className="text-xl font-bold">{sortedStandings[0]?.name}</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="standings">Standings</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="standings" className="space-y-6">
              {/* Filters and Controls */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="points">Points</SelectItem>
                        <SelectItem value="gd">Goal Difference</SelectItem>
                        <SelectItem value="gf">Goals For</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search teams..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Standings Table */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          W-L-D
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          GF
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          GA
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          GD
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedStandings.map((team, index) => (
                        <tr key={team.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getPositionColor(index + 1)}`}>
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-sm">
                                  {team.name.split(' ').map(word => word.charAt(0)).join('').slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {team.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm font-medium text-gray-900">
                              {team.wins}-{team.losses}-{team.draws}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                            {team.goals_for}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                            {team.goals_against}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`text-sm font-medium ${
                              team.goals_for - team.goals_against > 0 ? 'text-green-600' : 
                              team.goals_for - team.goals_against < 0 ? 'text-red-600' : 
                              'text-gray-500'
                            }`}>
                              {team.goals_for - team.goals_against > 0 ? '+' : ''}{team.goals_for - team.goals_against}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm font-bold text-gray-900">
                              {team.points}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Other tabs content can be added here */}
            <TabsContent value="schedule" className="space-y-6">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Schedule view</h3>
                <p className="text-gray-500">Match schedule content would go here</p>
              </div>
            </TabsContent>

            {/* <TabsContent value="stats" className="space-y-6">
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Statistics view</h3>
                <p className="text-gray-500">League statistics content would go here</p>
              </div>
            </TabsContent> */}
          </Tabs>

          {sortedStandings.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No standings found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria' : 'This league has no standings data yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}