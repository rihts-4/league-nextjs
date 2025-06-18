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
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin,
  Search,
} from 'lucide-react';
import useFetchData from '@/hooks/useFetchData';
import { addTeam, editTeam, deleteTeam } from '@/app/api/actions';


export default function AdminTeamsPage() {
  const { isAdmin } = useAuth();

  const { leagues, teams, players, setTeams } = useFetchData();

  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    league_id: '',
    coach: '',
    founded: '',
    city: '',
    wins: 0,
    losses: 0,
    draws: 0,
    points: 0,
    goals_for: 0,
    goals_against: 0
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

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.coach.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLeagueName = (leagueId: string) => {
    return leagues.find(league => league.id === leagueId)?.name || 'Unknown League';
  };

  const getTeamPlayerCount = (teamId: string) => {
    return players.filter(player => player.team_id === teamId).length;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      league_id: '',
      coach: '',
      founded: '',
      city: '',
      wins: 0,
      losses: 0,
      draws: 0,
      points: 0,
      goals_for: 0,
      goals_against: 0
    });
  };

  const handleCreateTeam = async () => {
    console.log('sending.....')
    const newTeam = { ...formData };
    await addTeam(newTeam).then(updatedTeams => {
      console.log('updating server state.....')
      setTeams(updatedTeams);
      console.log('server state updated')
    });
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEditTeam = async () => {
    if (selectedTeam) {
      console.log('updating.....')
      const editedTeam = {
        ...selectedTeam,
        ...formData
      }
      await editTeam(editedTeam).then(updatedTeams => {
        console.log('updating server state.....')
        setTeams(updatedTeams);
        console.log('server state updated')
      });
      setIsEditDialogOpen(false);
      setSelectedTeam(null);
      resetForm();
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      console.log('deleting.....')
      await deleteTeam(teamId).then(updatedTeams => {
        console.log('updating server state.....')
        setTeams(updatedTeams);
        console.log('server state updated')
      });
    }
  };

  const openEditDialog = (team: any) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name,
      league_id: team.league_id,
      coach: team.coach,
      founded: team.founded,
      city: team.city,
      wins: team.wins,
      losses: team.losses,
      draws: team.draws,
      points: team.points,
      goals_for: team.goals_for,
      goals_against: team.goals_against
    });
    setIsEditDialogOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Teams</h1>
              <p className="text-gray-600 mt-2">Create and manage teams across all leagues</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); setIsCreateDialogOpen(true); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Team</DialogTitle>
                  <DialogDescription>
                    Create a new team and assign it to a league.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Team Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter team name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="Team city"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="league">League</Label>
                      <Select value={formData.league_id} onValueChange={(value) => setFormData({...formData, league_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select league" />
                        </SelectTrigger>
                        <SelectContent>
                          {leagues.map(league => (
                            <SelectItem key={league.id} value={league.id || ''}>{league.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="coach">Coach</Label>
                      <Input
                        id="coach"
                        value={formData.coach}
                        onChange={(e) => setFormData({...formData, coach: e.target.value})}
                        placeholder="Coach name"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="founded">Founded Year</Label>
                    <Input
                      id="founded"
                      type='date'
                      value={formData.founded}
                      onChange={(e) => setFormData({...formData, founded: e.target.value})}
                      placeholder="e.g., 2020"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="wins">Wins</Label>
                      <Input
                        id="wins"
                        type="number"
                        value={formData.wins}
                        onChange={(e) => setFormData({...formData, wins: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="losses">Losses</Label>
                      <Input
                        id="losses"
                        type="number"
                        value={formData.losses}
                        onChange={(e) => setFormData({...formData, losses: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="draws">Draws</Label>
                      <Input
                        id="draws"
                        type="number"
                        value={formData.draws}
                        onChange={(e) => setFormData({...formData, draws: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="points">Points</Label>
                      <Input
                        id="points"
                        type="number"
                        value={formData.points}
                        onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goalsFor">Goals For</Label>
                      <Input
                        id="goalsFor"
                        type="number"
                        value={formData.goals_for}
                        onChange={(e) => setFormData({...formData, goals_for: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goalsAgainst">Goals Against</Label>
                      <Input
                        id="goalsAgainst"
                        type="number"
                        value={formData.goals_against}
                        onChange={(e) => setFormData({...formData, goals_against: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleCreateTeam}>
                    Add Team
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {team.city}
                        </div>
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {getLeagueName(team.league_id)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-green-50 p-2 rounded">
                        <div className="font-bold text-green-600">{team.wins}</div>
                        <div className="text-xs text-gray-500">Wins</div>
                      </div>
                      <div className="bg-red-50 p-2 rounded">
                        <div className="font-bold text-red-600">{team.losses}</div>
                        <div className="text-xs text-gray-500">Losses</div>
                      </div>
                      <div className="bg-yellow-50 p-2 rounded">
                        <div className="font-bold text-yellow-600">{team.draws}</div>
                        <div className="text-xs text-gray-500">Draws</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Points</span>
                        <span className="font-medium">{team.points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Goals</span>
                        <span className="font-medium">{team.goals_for} - {team.goals_against}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coach</span>
                        <span className="font-medium">{team.coach}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Players</span>
                        <span className="font-medium">{getTeamPlayerCount(team.id || '')}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(team)} className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteTeam(team.id || '')} className="flex-1">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTeams.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
              <p className="text-gray-500">Create your first team to get started</p>
            </div>
          )}

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Team</DialogTitle>
                <DialogDescription>
                  Update team information and statistics.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Team Name</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter team name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-city">City</Label>
                    <Input
                      id="edit-city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      placeholder="Team city"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-league">League</Label>
                    <Select value={formData.league_id} onValueChange={(value) => setFormData({...formData, league_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select league" />
                      </SelectTrigger>
                      <SelectContent>
                        {leagues.map(league => (
                          <SelectItem key={league.id} value={league.id || ''}>{league.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-coach">Coach</Label>
                    <Input
                      id="edit-coach"
                      value={formData.coach}
                      onChange={(e) => setFormData({...formData, coach: e.target.value})}
                      placeholder="Coach name"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-founded">Founded Year</Label>
                  <Input
                    id="edit-founded"
                    value={formData.founded}
                    onChange={(e) => setFormData({...formData, founded: e.target.value})}
                    placeholder="e.g., 2020"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-wins">Wins</Label>
                    <Input
                      id="edit-wins"
                      type="number"
                      value={formData.wins}
                      onChange={(e) => setFormData({...formData, wins: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-losses">Losses</Label>
                    <Input
                      id="edit-losses"
                      type="number"
                      value={formData.losses}
                      onChange={(e) => setFormData({...formData, losses: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-draws">Draws</Label>
                    <Input
                      id="edit-draws"
                      type="number"
                      value={formData.draws}
                      onChange={(e) => setFormData({...formData, draws: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-points">Points</Label>
                    <Input
                      id="edit-points"
                      type="number"
                      value={formData.points}
                      onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-goalsFor">Goals For</Label>
                    <Input
                      id="edit-goalsFor"
                      type="number"
                      value={formData.goals_for}
                      onChange={(e) => setFormData({...formData, goals_for: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-goalsAgainst">Goals Against</Label>
                    <Input
                      id="edit-goalsAgainst"
                      type="number"
                      value={formData.goals_against}
                      onChange={(e) => setFormData({...formData, goals_against: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleEditTeam}>
                  Update Team
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}