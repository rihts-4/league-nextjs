'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  MapPin,
  Search,
  Play,
  CheckCircle,
  Pause,
  Trophy,
  Users
} from 'lucide-react';
import useFetchData from '@/hooks/useFetchData';

export default function AdminGamesPage() {
  const { isAdmin } = useAuth();

  const { leagues, teams, games, setGames } = useFetchData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [formData, setFormData] = useState({
    leagueId: '',
    homeTeamId: '',
    awayTeamId: '',
    homeScore: 0,
    awayScore: 0,
    date: '',
    time: '',
    venue: '',
    status: 'scheduled',
    week: 1
  });

  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You need admin privileges to access this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const filteredGames = games.filter(game => {
    const homeTeam = teams.find(t => t.id === game.homeTeamId);
    const awayTeam = teams.find(t => t.id === game.awayTeamId);
    const league = leagues.find(l => l.id === game.leagueId);
    
    const matchesSearch = 
      homeTeam?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      awayTeam?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || game.status === statusFilter;
    
    return matchesSearch && matchesStatus;
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

  const resetForm = () => {
    setFormData({
      leagueId: '',
      homeTeamId: '',
      awayTeamId: '',
      homeScore: 0,
      awayScore: 0,
      date: '',
      time: '',
      venue: '',
      status: 'scheduled',
      week: 1
    });
  };

  const handleCreateGame = () => {
    const newGame = {
      id: Date.now().toString(),
      ...formData
    };
    setGames([...games, newGame]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEditGame = () => {
    if (selectedGame) {
      const updatedGames = games.map(game =>
        game.id === selectedGame.id
          ? { ...game, ...formData }
          : game
      );
      setGames(updatedGames);
      setIsEditDialogOpen(false);
      setSelectedGame(null);
      resetForm();
    }
  };

  const handleDeleteGame = (gameId: string) => {
    if (confirm('Are you sure you want to delete this game? This action cannot be undone.')) {
      setGames(games.filter(game => game.id !== gameId));
    }
  };

  const openEditDialog = (game: any) => {
    setSelectedGame(game);
    setFormData({
      leagueId: game.leagueId,
      homeTeamId: game.homeTeamId,
      awayTeamId: game.awayTeamId,
      homeScore: game.homeScore,
      awayScore: game.awayScore,
      date: game.date,
      time: game.time,
      venue: game.venue,
      status: game.status,
      week: game.week
    });
    setIsEditDialogOpen(true);
  };

  const getTeamsForLeague = (leagueId: string) => {
    return teams.filter(team => team.leagueId === leagueId);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Games</h1>
              <p className="text-gray-600 mt-2">Schedule and manage games across all leagues</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); setIsCreateDialogOpen(true); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Game
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Schedule New Game</DialogTitle>
                  <DialogDescription>
                    Create a new game between two teams.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                  <div className="grid gap-2">
                    <Label htmlFor="league">League</Label>
                    <Select value={formData.leagueId} onValueChange={(value) => setFormData({...formData, leagueId: value, homeTeamId: '', awayTeamId: ''})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select league" />
                      </SelectTrigger>
                      <SelectContent>
                        {leagues.map(league => (
                          <SelectItem key={league.id} value={league.id}>{league.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="homeTeam">Home Team</Label>
                      <Select value={formData.homeTeamId} onValueChange={(value) => setFormData({...formData, homeTeamId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select home team" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTeamsForLeague(formData.leagueId).map(team => (
                            <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="awayTeam">Away Team</Label>
                      <Select value={formData.awayTeamId} onValueChange={(value) => setFormData({...formData, awayTeamId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select away team" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTeamsForLeague(formData.leagueId).filter(team => team.id !== formData.homeTeamId).map(team => (
                            <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="venue">Venue</Label>
                    <Input
                      id="venue"
                      value={formData.venue}
                      onChange={(e) => setFormData({...formData, venue: e.target.value})}
                      placeholder="Stadium or venue name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="week">Week</Label>
                      <Input
                        id="week"
                        type="number"
                        value={formData.week}
                        onChange={(e) => setFormData({...formData, week: parseInt(e.target.value) || 1})}
                        min="1"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="live">Live</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {(formData.status === 'completed' || formData.status === 'live') && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="homeScore">Home Score</Label>
                        <Input
                          id="homeScore"
                          type="number"
                          value={formData.homeScore}
                          onChange={(e) => setFormData({...formData, homeScore: parseInt(e.target.value) || 0})}
                          min="0"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="awayScore">Away Score</Label>
                        <Input
                          id="awayScore"
                          type="number"
                          value={formData.awayScore}
                          onChange={(e) => setFormData({...formData, awayScore: parseInt(e.target.value) || 0})}
                          min="0"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleCreateGame}>
                    Schedule Game
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Trophy className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Games List */}
          <div className="space-y-4">
            {filteredGames.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow">
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
                          {getLeagueName(game.leagueId)}
                        </Badge>
                        <div className="text-sm text-gray-500">Week {game.week}</div>
                      </div>
                      
                      <div className="flex items-center justify-between max-w-md">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{getTeamName(game.homeTeamId)}</div>
                          <div className="text-sm text-gray-500">Home</div>
                        </div>
                        
                        <div className="text-center px-4">
                          {game.status === 'completed' || game.status === 'live' ? (
                            <div className={`text-2xl font-bold ${game.status === 'live' ? 'text-green-600' : 'text-gray-900'}`}>
                              {game.homeScore} - {game.awayScore}
                              {game.status === 'live' && (
                                <div className="text-xs text-green-600 animate-pulse">LIVE</div>
                              )}
                            </div>
                          ) : (
                            <div className="text-gray-400 text-lg">vs</div>
                          )}
                        </div>
                        
                        <div className="text-center">
                          <div className="font-semibold text-lg">{getTeamName(game.awayTeamId)}</div>
                          <div className="text-sm text-gray-500">Away</div>
                        </div>
                      </div>
                    </div>

                    {/* Game Details and Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="text-right space-y-1">
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
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(game)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteGame(game.id)}>
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
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
              <p className="text-gray-500">Schedule your first game to get started</p>
            </div>
          )}

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Game</DialogTitle>
                <DialogDescription>
                  Update game information and scores.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid gap-2">
                  <Label htmlFor="edit-league">League</Label>
                  <Select value={formData.leagueId} onValueChange={(value) => setFormData({...formData, leagueId: value, homeTeamId: '', awayTeamId: ''})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select league" />
                    </SelectTrigger>
                    <SelectContent>
                      {leagues.map(league => (
                        <SelectItem key={league.id} value={league.id}>{league.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-homeTeam">Home Team</Label>
                    <Select value={formData.homeTeamId} onValueChange={(value) => setFormData({...formData, homeTeamId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select home team" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTeamsForLeague(formData.leagueId).map(team => (
                          <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-awayTeam">Away Team</Label>
                    <Select value={formData.awayTeamId} onValueChange={(value) => setFormData({...formData, awayTeamId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select away team" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTeamsForLeague(formData.leagueId).filter(team => team.id !== formData.homeTeamId).map(team => (
                          <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-date">Date</Label>
                    <Input
                      id="edit-date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-time">Time</Label>
                    <Input
                      id="edit-time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-venue">Venue</Label>
                  <Input
                    id="edit-venue"
                    value={formData.venue}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    placeholder="Stadium or venue name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-week">Week</Label>
                    <Input
                      id="edit-week"
                      type="number"
                      value={formData.week}
                      onChange={(e) => setFormData({...formData, week: parseInt(e.target.value) || 1})}
                      min="1"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {(formData.status === 'completed' || formData.status === 'live') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-homeScore">Home Score</Label>
                      <Input
                        id="edit-homeScore"
                        type="number"
                        value={formData.homeScore}
                        onChange={(e) => setFormData({...formData, homeScore: parseInt(e.target.value) || 0})}
                        min="0"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-awayScore">Away Score</Label>
                      <Input
                        id="edit-awayScore"
                        type="number"
                        value={formData.awayScore}
                        onChange={(e) => setFormData({...formData, awayScore: parseInt(e.target.value) || 0})}
                        min="0"
                      />
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleEditGame}>
                  Update Game
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}