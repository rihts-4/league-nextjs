'use client';

import React, { useState, useMemo } from 'react';
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
  TrendingUp,
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

  // Group games by league
  const gamesByLeague = useMemo(() => {
    const grouped = filteredGames.reduce((acc, game) => {
      const leagueId = game.league_id;
      if (!acc[leagueId]) {
        acc[leagueId] = [];
      }
      acc[leagueId].push(game);
      return acc;
    }, {} as Record<string, typeof games>);

    // Sort games within each league by date
    Object.keys(grouped).forEach(leagueId => {
      grouped[leagueId].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });

    return grouped;
  }, [filteredGames]);

  const getTeamName = (teamId: string) => {
    return teams.find(team => team.id === teamId)?.name || 'Unknown Team';
  };

  const getLeagueName = (leagueId: string) => {
    return leagues.find(league => league.id === leagueId)?.name || 'Unknown League';
  };

  const getLeagueIcon = (leagueId: string) => {
    const league = leagues.find(l => l.id === leagueId);
    // You can customize icons based on league type or name
    return <Trophy className="h-5 w-5" />;
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
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Games & Fixtures</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Stay up to date with all the latest games, scores, and schedules
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-green-100">Live Games</p>
                    <p className="text-xl sm:text-3xl font-bold">{liveGames}</p>
                  </div>
                  <Play className="h-5 w-5 sm:h-8 sm:w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-yellow-100">Upcoming</p>
                    <p className="text-xl sm:text-3xl font-bold">{upcomingGames}</p>
                  </div>
                  <Clock className="h-5 w-5 sm:h-8 sm:w-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-blue-100">Completed</p>
                    <p className="text-xl sm:text-3xl font-bold">{completedGames}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 sm:h-8 sm:w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white col-span-2 lg:col-span-1">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-purple-100">Total Games</p>
                    <p className="text-xl sm:text-3xl font-bold">{filteredGames.length}</p>
                  </div>
                  <Calendar className="h-5 w-5 sm:h-8 sm:w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
            {/* Mobile Layout */}
            <div className="space-y-4 sm:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
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
                  <SelectTrigger>
                    <Trophy className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="League" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leagues</SelectItem>
                    {leagues.map(league => (
                      <SelectItem key={league.id} value={league.id || ''}>{league.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Desktop/Tablet Layout */}
            <div className="hidden sm:flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search games, teams, or venues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] md:w-[160px]">
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
                  <SelectTrigger className="w-[140px] md:w-[180px]">
                    <Trophy className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="League" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leagues</SelectItem>
                    {leagues.map(league => (
                      <SelectItem key={league.id} value={league.id || ''}>{league.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Games List Grouped by League */}
          {Object.keys(gamesByLeague).length > 0 ? (
            <div className="space-y-6 sm:space-y-8">
              {Object.entries(gamesByLeague).map(([leagueId, leagueGames]) => (
                <div key={leagueId}>
                  {/* League Header */}
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getLeagueIcon(leagueId)}
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 uppercase tracking-wide">
                          {getLeagueName(leagueId)}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {leagueGames.length} {leagueGames.length === 1 ? 'game' : 'games'}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>

                  {/* Games in this league */}
                  <div className="space-y-3 sm:space-y-4">
                    {leagueGames.map((game) => (
                      <Card key={game.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                          {/* Mobile Layout */}
                          <div className="sm:hidden space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs ${getStatusColor(game.status)}`}>
                                  {getStatusIcon(game.status)}
                                  <span className="ml-1 capitalize">{game.status}</span>
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-500">Week {game.week}</div>
                            </div>
                            
                            <div className="text-center">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">{getTeamName(game.home_team_id)}</div>
                                <div className="text-sm font-medium">{getTeamName(game.away_team_id)}</div>
                              </div>
                              
                              <div className="flex items-center justify-center mb-2">
                                {game.status === 'completed' ? (
                                  <div className="text-xl font-bold text-gray-900">
                                    {game.home_score} - {game.away_score}
                                  </div>
                                ) : game.status === 'live' ? (
                                  <div className="text-xl font-bold text-green-600">
                                    {game.home_score} - {game.away_score}
                                    <div className="text-xs text-green-600 animate-pulse">LIVE</div>
                                  </div>
                                ) : (
                                  <div className="text-gray-400 text-lg">vs</div>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(game.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                              <div className="flex items-center justify-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {game.time}
                              </div>
                              <div className="flex items-center justify-end">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span className="truncate">{game.venue}</span>
                              </div>
                            </div>
                          </div>

                          {/* Desktop/Tablet Layout */}
                          <div className="hidden sm:block">
                            <div className="flex items-center justify-between">
                              {/* Game Info */}
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <Badge className={getStatusColor(game.status)}>
                                    {getStatusIcon(game.status)}
                                    <span className="ml-1 capitalize">{game.status}</span>
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
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
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