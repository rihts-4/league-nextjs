'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users,
  Search,
  ArrowRight,
  MapPin,
  TrendingUp,
  Medal,
  Trophy,
  Filter,
  FileText,
} from 'lucide-react';
import useFetchData from '@/hooks/useFetchData';

export default function TeamsPage() {
  const { leagues, teams, players } = useFetchData();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('points');
  const [selectedLeague, setSelectedLeague] = useState('all');

  /*
  * ======================================================== 
  * START OF SEARCH AND FILTER FUNCTIONALITY 
  * ======================================================== 
  */

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.coach.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLeague = selectedLeague === 'all' || team.league_id === selectedLeague;
    
    return matchesSearch && matchesLeague;
  });

  const sortTeams = (teamsToSort: any[]) => {
    return teamsToSort.sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return b.points - a.points;
        case 'wins':
          return b.wins - a.wins;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'goals':
          return b.goals_for - a.goals_for;
        default:
          return 0;
      }
    });
  };

  // Group teams by league
  const teamsByLeague = leagues.map(league => {
    const leagueTeams = filteredTeams.filter(team => team.league_id === league.id);
    return {
      league,
      teams: sortTeams(leagueTeams)
    };
  }).filter(group => group.teams.length > 0);

  /*
  * ======================================================== 
  * END OF SEARCH AND FILTER FUNCTIONALITY 
  * ======================================================== 
  */

  /*
  * ======================================================== 
  * START OF GET TEAM PLAYER COUNT AND WIN PERCENTAGE FUNCTIONALITY 
  * ======================================================== 
  */

  const getTeamPlayerCount = (teamId: string) => {
    return players.filter(player => player.team_id === teamId).length;
  };

  const getWinPercentage = (team: any) => {
    const totalGames = team.wins + team.losses + team.draws;
    return totalGames > 0 ? ((team.wins / totalGames) * 100).toFixed(1) : '0.0';
  };

  /*
  * ======================================================== 
  * END OF GET TEAM PLAYER COUNT AND WIN PERCENTAGE FUNCTIONALITY 
  * ======================================================== 
  */

  const getLeagueTeamRank = (teams: any[], teamId: string) => {
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    return sortedTeams.findIndex(team => team.id === teamId) + 1;
  };

  const getLeagueName = (leagueId: string) => {
    const league = leagues.find(l => l.id === leagueId);
    return league ? league.name : 'Unknown League';
  };

  const getStatusColor = (team: any) => {
    const winRate = parseFloat(getWinPercentage(team));
    if (winRate >= 70) return 'bg-green-100 text-green-800';
    if (winRate >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusText = (team: any) => {
    const winRate = parseFloat(getWinPercentage(team));
    if (winRate >= 70) return 'Excellent';
    if (winRate >= 50) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Teams</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage and view all teams across different leagues
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
            {/* Mobile Layout */}
            <div className="space-y-4 sm:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="League" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leagues</SelectItem>
                    {leagues.map(league => (
                      <SelectItem key={league.id} value={league.id}>
                        {league.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Points</SelectItem>
                    <SelectItem value="wins">Wins</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="goals">Goals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Desktop/Tablet Layout */}
            <div className="hidden sm:flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search teams, cities, or coaches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                  <SelectTrigger className="w-[140px] md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leagues</SelectItem>
                    {leagues.map(league => (
                      <SelectItem key={league.id} value={league.id}>
                        {league.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px] md:w-[150px]">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort" />
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

          {/* Teams Display */}
          {teamsByLeague.length > 0 ? (
            <div className="space-y-6 sm:space-y-8">
              {teamsByLeague.map(({ league, teams }) => (
                <div key={league.id} className="space-y-4">
                  {/* League Section Header */}
                  <div className="flex items-center space-x-3 pb-2 border-b border-gray-200">
                    <div className="bg-blue-100 p-1 rounded">
                      <Trophy className="h-4 w-4 text-blue-600" />
                    </div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 uppercase tracking-wide">
                      {league.name}
                    </h2>
                    <Badge variant="outline" className="text-xs">
                      {league.sport}
                    </Badge>
                  </div>

                  {/* Mobile Card Layout */}
                  <div className="sm:hidden space-y-3">
                    {teams.map((team) => {
                      const rank = getLeagueTeamRank(teams, team.id);
                      const playerCount = getTeamPlayerCount(team.id);
                      
                      return (
                        <Card key={team.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <CardTitle className="text-lg">{team.name}</CardTitle>
                                  {rank <= 3 && (
                                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs">
                                      <Medal className="h-3 w-3 mr-1" />
                                      #{rank}
                                    </Badge>
                                  )}
                                </div>
                                <CardDescription>
                                  <div className="flex items-center text-gray-600">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {team.city}
                                  </div>
                                </CardDescription>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-blue-600">{team.points}</div>
                                <div className="text-xs text-gray-500">points</div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {/* Mobile Stats Grid */}
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-green-50 p-2 rounded">
                                  <div className="text-sm font-bold text-green-600">{team.wins}</div>
                                  <div className="text-xs text-gray-500">Wins</div>
                                </div>
                                <div className="bg-red-50 p-2 rounded">
                                  <div className="text-sm font-bold text-red-600">{team.losses}</div>
                                  <div className="text-xs text-gray-500">Losses</div>
                                </div>
                                <div className="bg-yellow-50 p-2 rounded">
                                  <div className="text-sm font-bold text-yellow-600">{team.draws}</div>
                                  <div className="text-xs text-gray-500">Draws</div>
                                </div>
                              </div>

                              {/* Mobile Additional Stats */}
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Win Rate</span>
                                  <Badge className={`text-xs ${getStatusColor(team)}`}>
                                    {getWinPercentage(team)}%
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Goals</span>
                                  <span className="font-medium">{team.goals_for} - {team.goals_against}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Coach</span>
                                  <span className="font-medium truncate ml-2">{team.coach}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Players</span>
                                  <span className="font-medium">{playerCount}</span>
                                </div>
                              </div>

                              <Link href={`/teams/${team.id}`}>
                                <Button size="sm" className="w-full group mt-2">
                                  View Details
                                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Tablet/Desktop Table Layout */}
                  <div className="hidden sm:block bg-white rounded-lg shadow-sm border overflow-hidden">
                    {/* Table Header - Hidden on mobile, visible on sm+ */}
                    <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-xs font-medium text-gray-500 uppercase tracking-wide">
                      <div className="col-span-4">Team</div>
                      <div className="col-span-2">Performance</div>
                      <div className="col-span-2">Stats</div>
                      <div className="col-span-3">Record</div>
                      <div className="col-span-1">Action</div>
                    </div>

                    {/* Tablet Header (sm to md) */}
                    <div className="md:hidden grid grid-cols-8 gap-2 px-4 py-3 bg-gray-50 border-b text-xs font-medium text-gray-500 uppercase tracking-wide">
                      <div className="col-span-3">Team</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Record</div>
                      <div className="col-span-1">View</div>
                    </div>

                    {/* Teams Rows */}
                    <div className="divide-y divide-gray-100">
                      {teams.map((team) => {
                        const rank = getLeagueTeamRank(teams, team.id);
                        const playerCount = getTeamPlayerCount(team.id);
                        
                        return (
                          <div key={team.id}>
                            {/* Desktop Layout (md+) */}
                            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                              {/* Team Info */}
                              <div className="col-span-4">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-100 p-2 rounded-lg">
                                    <FileText className="h-4 w-4 text-gray-600" />
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <h3 className="font-medium text-gray-900">{team.name}</h3>
                                      {rank <= 3 && (
                                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs">
                                          <Medal className="h-3 w-3 mr-1" />
                                          #{rank}
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {team.city}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      Coach: {team.coach}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Performance Status */}
                              <div className="col-span-2">
                                <div className="flex items-center space-x-2">
                                  <Badge className={`text-xs ${getStatusColor(team)}`}>
                                    {getStatusText(team)}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {getWinPercentage(team)}% win rate
                                </div>
                              </div>

                              {/* Stats */}
                              <div className="col-span-2">
                                <div className="text-sm">
                                  <div className="font-medium text-blue-600">{team.points} pts</div>
                                  <div className="text-gray-500">
                                    {team.goals_for} - {team.goals_against} goals
                                  </div>
                                  <div className="text-gray-400 text-xs">
                                    {playerCount} players
                                  </div>
                                </div>
                              </div>

                              {/* Record */}
                              <div className="col-span-3">
                                <div className="flex space-x-4 text-sm">
                                  <div className="text-center">
                                    <div className="font-medium text-green-600">{team.wins}</div>
                                    <div className="text-xs text-gray-500">W</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-medium text-red-600">{team.losses}</div>
                                    <div className="text-xs text-gray-500">L</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-medium text-yellow-600">{team.draws}</div>
                                    <div className="text-xs text-gray-500">D</div>
                                  </div>
                                </div>
                              </div>

                              {/* Action */}
                              <div className="col-span-1">
                                <Link href={`/teams/${team.id}`}>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <ArrowRight className="h-4 w-4" />
                                  </Button>
                                </Link>
                              </div>
                            </div>

                            {/* Tablet Layout (sm to md) */}
                            <div className="md:hidden grid grid-cols-8 gap-2 px-4 py-3 hover:bg-gray-50 transition-colors">
                              {/* Team Info */}
                              <div className="col-span-3">
                                <div className="flex items-center space-x-2">
                                  <div className="bg-gray-100 p-1 rounded">
                                    <FileText className="h-3 w-3 text-gray-600" />
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-1">
                                      <h3 className="font-medium text-gray-900 text-sm truncate">{team.name}</h3>
                                      {rank <= 3 && (
                                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs">
                                          #{rank}
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">{team.city}</div>
                                  </div>
                                </div>
                              </div>

                              {/* Status */}
                              <div className="col-span-2">
                                <Badge className={`text-xs ${getStatusColor(team)} mb-1`}>
                                  {getWinPercentage(team)}%
                                </Badge>
                                <div className="text-xs text-gray-600">{team.points} pts</div>
                              </div>

                              {/* Record */}
                              <div className="col-span-2">
                                <div className="flex space-x-2 text-xs">
                                  <span className="text-green-600 font-medium">{team.wins}W</span>
                                  <span className="text-red-600 font-medium">{team.losses}L</span>
                                  <span className="text-yellow-600 font-medium">{team.draws}D</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {team.goals_for}-{team.goals_against}
                                </div>
                              </div>

                              {/* Action */}
                              <div className="col-span-1">
                                <Link href={`/teams/${team.id}`}>
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                    <ArrowRight className="h-3 w-3" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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