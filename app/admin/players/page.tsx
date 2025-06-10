'use client';

import React, { useEffect, useState } from 'react';
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
  UserCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Target,
  Search,
  User,
  Trophy,
  AlertTriangle
} from 'lucide-react';
import { 
  leagueService, 
  playerService, 
  teamService 
} from '@/services/supabaseService';
import { League, Player, Team } from '@/types';

export default function AdminPlayersPage() {
  const { isAdmin } = useAuth();

  /* ======================================================== 
  * START OF FETCHING DATA FROM SUPABASE 
  * ======================================================== */
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leagues = await leagueService.getLeagues();
        setLeagues(leagues);
        
        const teams = await teamService.getTeams();
        setTeams(teams);
        
        const players = await playerService.getPlayers();
        setPlayers(players);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  /* ======================================================== 
  * END OF FETCHING DATA FROM SUPABASE 
  * ======================================================== */

  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    teamId: '',
    position: '',
    age: 0,
    jerseyNumber: 0,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0
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

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = teamFilter === 'all' || player.teamId === teamFilter;
    
    return matchesSearch && matchesTeam;
  });

  const getTeamName = (teamId: string) => {
    return teams.find(team => team.id === teamId)?.name || 'Unknown Team';
  };

  const getLeagueFromTeam = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team ? leagues.find(l => l.id === team.leagueId)?.name || 'Unknown' : 'Unknown';
  };

  const resetForm = () => {
    setFormData({
      name: '',
      teamId: '',
      position: '',
      age: 0,
      jerseyNumber: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0
    });
  };

  const handleCreatePlayer = () => {
    const newPlayer = {
      id: Date.now().toString(),
      ...formData
    };
    setPlayers([...players, newPlayer]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEditPlayer = () => {
    if (selectedPlayer) {
      const updatedPlayers = players.map(player =>
        player.id === selectedPlayer.id
          ? { ...player, ...formData }
          : player
      );
      setPlayers(updatedPlayers);
      setIsEditDialogOpen(false);
      setSelectedPlayer(null);
      resetForm();
    }
  };

  const handleDeletePlayer = (playerId: string) => {
    if (confirm('Are you sure you want to delete this player? This action cannot be undone.')) {
      setPlayers(players.filter(player => player.id !== playerId));
    }
  };

  const openEditDialog = (player: any) => {
    setSelectedPlayer(player);
    setFormData({
      name: player.name,
      teamId: player.teamId,
      position: player.position,
      age: player.age,
      jerseyNumber: player.jerseyNumber,
      goals: player.goals,
      assists: player.assists,
      yellowCards: player.yellowCards,
      redCards: player.redCards
    });
    setIsEditDialogOpen(true);
  };

  const positions = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Center', 'Guard'];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Players</h1>
              <p className="text-gray-600 mt-2">Register and manage players across all teams</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); setIsCreateDialogOpen(true); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Register Player
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Register New Player</DialogTitle>
                  <DialogDescription>
                    Add a new player to a team roster.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Player Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter player name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                        placeholder="Player age"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="team">Team</Label>
                      <Select value={formData.teamId} onValueChange={(value) => setFormData({...formData, teamId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map(team => (
                            <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="position">Position</Label>
                      <Select value={formData.position} onValueChange={(value) => setFormData({...formData, position: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          {positions.map(position => (
                            <SelectItem key={position} value={position}>{position}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="jerseyNumber">Jersey Number</Label>
                    <Input
                      id="jerseyNumber"
                      type="number"
                      value={formData.jerseyNumber}
                      onChange={(e) => setFormData({...formData, jerseyNumber: parseInt(e.target.value) || 0})}
                      placeholder="Jersey number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="goals">Goals</Label>
                      <Input
                        id="goals"
                        type="number"
                        value={formData.goals}
                        onChange={(e) => setFormData({...formData, goals: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="assists">Assists</Label>
                      <Input
                        id="assists"
                        type="number"
                        value={formData.assists}
                        onChange={(e) => setFormData({...formData, assists: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="yellowCards">Yellow Cards</Label>
                      <Input
                        id="yellowCards"
                        type="number"
                        value={formData.yellowCards}
                        onChange={(e) => setFormData({...formData, yellowCards: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="redCards">Red Cards</Label>
                      <Input
                        id="redCards"
                        type="number"
                        value={formData.redCards}
                        onChange={(e) => setFormData({...formData, redCards: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleCreatePlayer}>
                    Register Player
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
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="w-[200px]">
                <Users className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map(team => (
                  <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <Card key={player.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mt-1">
                          #{player.jerseyNumber}
                        </Badge>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{player.position}</div>
                      <div className="text-xs text-gray-500">Age {player.age}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Team</span>
                        <span className="font-medium">{getTeamName(player.teamId)}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">League</span>
                        <span className="font-medium text-xs">{getLeagueFromTeam(player.teamId)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="font-bold text-blue-600">{player.goals}</div>
                        <div className="text-xs text-gray-500">Goals</div>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <div className="font-bold text-green-600">{player.assists}</div>
                        <div className="text-xs text-gray-500">Assists</div>
                      </div>
                    </div>

                    {(player.yellowCards > 0 || player.redCards > 0) && (
                      <div className="flex justify-center gap-2">
                        {player.yellowCards > 0 && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                            {player.yellowCards} Yellow
                          </Badge>
                        )}
                        {player.redCards > 0 && (
                          <Badge variant="outline" className="text-red-600 border-red-300">
                            {player.redCards} Red
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(player)} className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeletePlayer(player.id)} className="flex-1">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No players found</h3>
              <p className="text-gray-500">Register your first player to get started</p>
            </div>
          )}

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Player</DialogTitle>
                <DialogDescription>
                  Update player information and statistics.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Player Name</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter player name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-age">Age</Label>
                    <Input
                      id="edit-age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                      placeholder="Player age"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-team">Team</Label>
                    <Select value={formData.teamId} onValueChange={(value) => setFormData({...formData, teamId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map(team => (
                          <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-position">Position</Label>
                    <Select value={formData.position} onValueChange={(value) => setFormData({...formData, position: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map(position => (
                          <SelectItem key={position} value={position}>{position}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-jerseyNumber">Jersey Number</Label>
                  <Input
                    id="edit-jerseyNumber"
                    type="number"
                    value={formData.jerseyNumber}
                    onChange={(e) => setFormData({...formData, jerseyNumber: parseInt(e.target.value) || 0})}
                    placeholder="Jersey number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-goals">Goals</Label>
                    <Input
                      id="edit-goals"
                      type="number"
                      value={formData.goals}
                      onChange={(e) => setFormData({...formData, goals: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-assists">Assists</Label>
                    <Input
                      id="edit-assists"
                      type="number"
                      value={formData.assists}
                      onChange={(e) => setFormData({...formData, assists: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-yellowCards">Yellow Cards</Label>
                    <Input
                      id="edit-yellowCards"
                      type="number"
                      value={formData.yellowCards}
                      onChange={(e) => setFormData({...formData, yellowCards: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-redCards">Red Cards</Label>
                    <Input
                      id="edit-redCards"
                      type="number"
                      value={formData.redCards}
                      onChange={(e) => setFormData({...formData, redCards: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleEditPlayer}>
                  Update Player
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}