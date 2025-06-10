'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMockData } from '@/hooks/useMockData';
import { 
  Users, 
  Trophy, 
  Target, 
  Search,
  Filter,
  ArrowRight,
  MapPin,
  User,
  TrendingUp,
  Medal
} from 'lucide-react';

export default function TeamsPage() {
  const { teams, leagues, players } = useMockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [leagueFilter, setLeagueFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');

  const filteredAndSortedTeams = teams
    .filter(team => {
      const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           team.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           team.coach.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLeague = leagueFilter === 'all' || team.leagueId === leagueFilter;
      
      return matchesSearch && matchesLeague;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return b.points - a.points;
        case 'wins':
          return b.wins - a.wins;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'goals':
          return b.goalsFor - a.goalsFor;
        default:
          return 0;
      }
    });

  const getLeagueName = (leagueId: string) => {
    return leagues.find(league => league.id === leagueId)?.name || 'Unknown League';
  };

  const getTeamPlayerCount = (teamId: string) => {
    return players.filter(player => player.teamId === teamId).length;
  };

  const getWinPercentage = (team: any) => {
    const totalGames = team.wins + team.losses + team.draws;
    return totalGames > 0 ? ((team.wins / totalGames) * 100).toFixed(1) : '0.0';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Teams</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore all teams across different leagues. Discover team statistics, rosters, 
              and performance metrics from your favorite sports organizations.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search teams, cities, or coaches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4 flex-wrap">
                <Select value={leagueFilter} onValueChange={setLeagueFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Leagues" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leagues</SelectItem>
                    {leagues.map(league => (
                      <SelectItem key={league.id} value={league.id}>{league.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Points</SelectItem>
                    <SelectItem value="wins">Wins</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="goals">Goals For</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTeams.map((team, index) => (
              <Card key={team.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      {index < 3 && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900">
                          <Medal className="h-3 w-3 mr-1" />
                          #{index + 1}
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {getLeagueName(team.leagueId)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{team.points}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{team.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {team.city}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{team.wins}</div>
                        <div className="text-xs text-gray-500">Wins</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-red-600">{team.losses}</div>
                        <div className="text-xs text-gray-500">Losses</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-yellow-600">{team.draws}</div>
                        <div className="text-xs text-gray-500">Draws</div>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Win Rate</span>
                        <span className="font-medium">{getWinPercentage(team)}%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Goals</span>
                        <span className="font-medium">{team.goalsFor} - {team.goalsAgainst}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Coach</span>
                        <span className="font-medium">{team.coach}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Players</span>
                        <span className="font-medium">{getTeamPlayerCount(team.id)}</span>
                      </div>
                    </div>

                    <Link href={`/teams/${team.id}`}>
                      <Button className="w-full group">
                        View Team Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAndSortedTeams.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}