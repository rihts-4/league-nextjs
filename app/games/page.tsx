'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search,
  Filter,
  Play,
  CheckCircle,
  Pause,
  Trophy,
} from 'lucide-react';
import useFetchData from '@/hooks/useFetchData';

export default function GamesPage() {
  const { leagues, teams, games } = useFetchData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [leagueFilter, setLeagueFilter] = useState('all');

  const filteredGames = games.filter(game => {
    const homeTeam = teams.find(t => t.id === game.home_team_id);
    const awayTeam = teams.find(t => t.id === game.away_team_id);
    const league = leagues.find(l => l.id === game.league_id);
    
    const matchesSearch = 
      homeTeam?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      awayTeam?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || game.status === statusFilter;
    const matchesLeague = leagueFilter === 'all' || game.league_id === leagueFilter;
    
    return matchesSearch && matchesStatus && matchesLeague;
  });

  const getTeamName = (teamId: string) => {
    return teams.find(team => team.id === teamId)?.name || 'Unknown Team';
  };

  const getLeagueName = (leagueId: string) => {
    return leagues.find(league => league.id === leagueId)?.name || 'Unknown League';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <Play className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'scheduled':
        return <Clock className="h-4 w-4" />;
      default:
        return <Pause className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingGames = filteredGames.filter(g => g.status === 'scheduled').length;
  const liveGames = filteredGames.filter(g => g.status === 'live').length;
  const completedGames = filteredGames.filter(g => g.status === 'completed').length;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Games & Fixtures</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay up to date with all the latest games, scores, and schedules across all leagues. 
              Follow live matches and catch up on recent results.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Live Games</p>
                    <p className="text-3xl font-bold">{liveGames}</p>
                  </div>
                  <Play className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100">Upcoming</p>
                    <p className="text-3xl font-bold">{upcomingGames}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Completed</p>
                    <p className="text-3xl font-bold">{completedGames}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Total Games</p>
                    <p className="text-3xl font-bold">{filteredGames.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search games, teams, or venues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4 flex-wrap">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={leagueFilter} onValueChange={setLeagueFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Trophy className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="League" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leagues</SelectItem>
                    {leagues.map(league => (
                      <SelectItem key={league.id} value={league.id}>{league.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Games List */}
          <div className="space-y-6">
            {filteredGames.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    {/* Game Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={getStatusColor(game.status)}>
                          {getStatusIcon(game.status)}
                          <span className="ml-1 capitalize">{game.status}</span>
                        </Badge>
                        <Badge variant="outline">
                          {getLeagueName(game.league_id)}
                        </Badge>
                        <div className="text-sm text-gray-500">Week {game.week}</div>
                      </div>
                      
                      <div className="flex items-center justify-between max-w-md">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{getTeamName(game.home_team_id)}</div>
                          <div className="text-sm text-gray-500">Home</div>
                        </div>
                        
                        <div className="text-center px-4">
                          {game.status === 'completed' ? (
                            <div className="text-2xl font-bold text-gray-900">
                              {game.home_score} - {game.away_score}
                            </div>
                          ) : game.status === 'live' ? (
                            <div className="text-2xl font-bold text-green-600">
                              {game.home_score} - {game.away_score}
                              <div className="text-xs text-green-600 animate-pulse">LIVE</div>
                            </div>
                          ) : (
                            <div className="text-gray-400 text-lg">vs</div>
                          )}
                        </div>
                        
                        <div className="text-center">
                          <div className="font-semibold text-lg">{getTeamName(game.away_team_id)}</div>
                          <div className="text-sm text-gray-500">Away</div>
                        </div>
                      </div>
                    </div>

                    {/* Game Details */}
                    <div className="text-right space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(game.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {game.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {game.venue}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No games found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}