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
  Minus,
  ChevronRight
} from 'lucide-react';
import { Team, Player } from '@/types';

export default function TeamPage({ team, players }: { team: Team, players: Player[] }) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('points');
  const [activeTab, setActiveTab] = useState('overview');

  // Get team players
  const teamPlayers = players?.filter(player => player.team_id === team?.id) || [];

  if (!team) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Team not found</h2>
            <Link href="/teams">
              <Button className="mt-4">Back to Teams</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Team Header */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 pt-6 pb-4">
              <Link href="/" className="hover:text-white transition-colors">HOME</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/teams" className="hover:text-white transition-colors">TEAMS</Link>
              <ChevronRight className="h-4 w-4" />
            </div>

            {/* Team Header */}
            <div className="pb-8">
              {/* Team Name with Underline */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-wide">
                  {team.name}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
              </div>

              {/* Team Info Section */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                {/* Team Logo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-700 border-gray-700 flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-4xl md:text-5xl">
                      {team.name.split(' ').map(word => word.charAt(0)).join('').slice(0, 2)}
                    </span>
                  </div>
                </div>

                {/* Team Details Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                  {/* Country */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-400 uppercase tracking-wide text-sm font-medium">COUNTRY</span>
                      <span className="text-lg">🇺🇸</span>
                    </div>
                    <p className="text-gray-300">United States</p>
                  </div>

                  {/* Founded */}
                  <div>
                    <div className="text-gray-400 uppercase tracking-wide text-sm font-medium mb-2">FOUNDED</div>
                    <p className="text-gray-300">September 1, 2000</p>
                  </div>

                  {/* Players */} {/* TODO: Change to games played */}
                  <div>
                    <div className="text-gray-400 uppercase tracking-wide text-sm font-medium mb-2">PLAYERS</div>
                    <p className="text-gray-300">{teamPlayers.length}</p>
                  </div>

                  {/* City */}
                  <div>
                    <div className="text-gray-400 uppercase tracking-wide text-sm font-medium mb-2">CITY</div>
                    <p className="text-gray-300">{team.city}</p>
                  </div>

                  {/* Coach */}
                  <div>
                    <div className="text-gray-400 uppercase tracking-wide text-sm font-medium mb-2">COACH</div>
                    <p className="text-gray-300">{team.coach}</p>
                  </div>

                  {/* Status */}
                  <div>
                    <div className="text-gray-400 uppercase tracking-wide text-sm font-medium mb-2">STATUS</div>
                    <Badge className="bg-green-600 hover:bg-green-600 text-white">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Team Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Points</p>
                    <p className="text-3xl font-bold">{team.points}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Wins</p>
                    <p className="text-3xl font-bold">{team.wins}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Goals For</p>
                    <p className="text-3xl font-bold">{team.goals_for}</p>
                  </div>
                  <Shield className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Players</p>
                    <p className="text-3xl font-bold">{teamPlayers.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {/* <TabsTrigger value="players">Players</TabsTrigger> */}
              {/* <TabsTrigger value="matches">Matches</TabsTrigger> */}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Team Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Win Rate</span>
                        <span className="font-semibold">
                          {((team.wins / (team.wins + team.losses + team.draws)) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Goals Difference</span>
                        <span className={`font-semibold ${
                          team.goals_for - team.goals_against > 0 ? 'text-green-600' : 
                          team.goals_for - team.goals_against < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {team.goals_for - team.goals_against > 0 ? '+' : ''}{team.goals_for - team.goals_against}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Games</span>
                        <span className="font-semibold">{team.wins + team.losses + team.draws}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Form</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Wins</span>
                        <Badge className="bg-green-100 text-green-800">{team.wins}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Draws</span>
                        <Badge className="bg-yellow-100 text-yellow-800">{team.draws}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Losses</span>
                        <Badge className="bg-red-100 text-red-800">{team.losses}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="players" className="space-y-6">
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Players Roster</h3>
                <p className="text-gray-500">Team players information would be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">Current squad: {teamPlayers.length} players</p>
              </div>
            </TabsContent>

            <TabsContent value="matches" className="space-y-6">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Match Schedule</h3>
                <p className="text-gray-500">Recent and upcoming matches would be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Statistics</h3>
                <p className="text-gray-500">Advanced team statistics would be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}