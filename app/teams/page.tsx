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
  Trophy
} from 'lucide-react';
import useFetchData from '@/hooks/useFetchData';

export default function TeamsPage() {
  const { leagues, teams, players } = useFetchData();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('points');

  /*
  * ======================================================== 
  * START OF SEARCH AND FILTER FUNCTIONALITY 
  * ======================================================== 
  */

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.coach.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Teams by League</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore teams organized by their respective leagues. Compare performance metrics 
              and discover standout teams across different sports organizations.
            </p>
          </div>

          {/* Search and Sort Controls */}
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
              <div className="flex gap-4">
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

          {/* Teams by League Columns */}
          {teamsByLeague.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {teamsByLeague.map(({ league, teams }) => (
                <div key={league.id} className="space-y-6">
                  {/* League Header */}
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Trophy className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{league.name}</h2>
                          <p className="text-sm text-gray-500">{teams.length} teams</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {league.sport}
                      </Badge>
                    </div>
                  </div>

                  {/* Teams in this League */}
                  <div className="space-y-4">
                    {teams.map((team) => {
                      const rank = getLeagueTeamRank(teams, team.id);
                      return (
                        <Card key={team.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center space-x-2">
                                {rank <= 3 && (
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900">
                                    <Medal className="h-3 w-3 mr-1" />
                                    #{rank}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">{team.points}</div>
                                <div className="text-xs text-gray-500">points</div>
                              </div>
                            </div>
                            <CardTitle className="text-lg">{team.name}</CardTitle>
                            <CardDescription>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-1" />
                                {team.city}
                              </div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {/* Stats Grid */}
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

                              {/* Additional Stats */}
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Win Rate</span>
                                  <span className="font-medium">{getWinPercentage(team)}%</span>
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
                                  <span className="font-medium">{getTeamPlayerCount(team.id)}</span>
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