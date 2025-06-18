'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Trophy, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Search
} from 'lucide-react';
import useFetchData from '@/hooks/useFetchData';
import { addLeague, deleteLeague, editLeague } from '@/app/api/actions';
import { League } from '@/types';

export default function AdminLeaguesPage() {
  const { isAdmin } = useAuth();

  const { leagues, teams, setLeagues } = useFetchData();

  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    season: '',
    status: 'active',
    start_date: '',
    end_date: '',
    sport: ''
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

  const filteredLeagues = leagues.filter(league =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    league.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLeagueTeamCount = (leagueId: string) => {
    return teams.filter(team => team.league_id === leagueId).length;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      season: '',
      status: 'active',
      start_date: '',
      end_date: '',
      sport: ''
    });
  };

  const handleCreateLeague = async () => {
    console.log('sending.....')
    const newLeague = {
      ...formData,
      created_at: new Date().toISOString()
    };
    await addLeague(newLeague).then(updatedLeagues => {
      console.log('updating server state.....')
      setLeagues(updatedLeagues);
      console.log('server state updated')
    });
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEditLeague = async () => {
    if (selectedLeague) {
      console.log('updating.....')
      const editedLeague= {
        ...selectedLeague,
        ...formData
      }

      await editLeague(editedLeague).then(updatedLeagues => {
        console.log('updating server state.....')
        setLeagues(updatedLeagues);
        console.log('server state updated')
      });
      setIsEditDialogOpen(false);
      setSelectedLeague(null);
      resetForm();
    }
  };

  const handleDeleteLeague = async (leagueId: string) => {
    if (confirm('Are you sure you want to delete this league? This action cannot be undone.')) {
      console.log('deleting.....')
      await deleteLeague(leagueId).then(updatedLeagues => {
        console.log('updating server state.....')
        setLeagues(updatedLeagues);
        console.log('server state updated')
      });
    }
  };

  const openEditDialog = (league: League) => {
    setSelectedLeague(league);
    setFormData({
      name: league.name,
      description: league.description,
      season: league.season,
      status: league.status,
      start_date: league.start_date,
      end_date: league.end_date,
      sport: league.sport
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
              <h1 className="text-3xl font-bold text-gray-900">Manage Leagues</h1>
              <p className="text-gray-600 mt-2">Create and manage sports leagues</p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { resetForm(); setIsCreateDialogOpen(true); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create League
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New League</DialogTitle>
                  <DialogDescription>
                    Add a new sports league to the system.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">League Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter league name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sport">Sport</Label>
                    <Input
                      id="sport"
                      value={formData.sport}
                      onChange={(e) => setFormData({...formData, sport: e.target.value})}
                      placeholder="e.g., Soccer, Basketball"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="season">Season</Label>
                    <Input
                      id="season"
                      value={formData.season}
                      onChange={(e) => setFormData({...formData, season: e.target.value})}
                      placeholder="e.g., 2024"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Enter league description"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleCreateLeague}>
                    Create League
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
                placeholder="Search leagues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>
          </div>

          {/* Leagues Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Leagues</CardTitle>
              <CardDescription>
                Manage all sports leagues in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeagues.map((league) => (
                  <div key={league.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Trophy className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-medium">{league.name}</h3>
                          <p className="text-sm text-gray-500">{league.sport} • {league.season}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {getLeagueTeamCount(league.id || '')} teams
                        </div>
                      </div>
                      <Badge variant={league.status === 'active' ? 'default' : 'secondary'}>
                        {league.status}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(league)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteLeague(league.id || '')}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredLeagues.length === 0 && (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No leagues found</h3>
                  <p className="text-gray-500">Create your first league to get started</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit League</DialogTitle>
                <DialogDescription>
                  Update league information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">League Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter league name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-sport">Sport</Label>
                  <Input
                    id="edit-sport"
                    value={formData.sport}
                    onChange={(e) => setFormData({...formData, sport: e.target.value})}
                    placeholder="e.g., Soccer, Basketball"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-season">Season</Label>
                  <Input
                    id="edit-season"
                    value={formData.season}
                    onChange={(e) => setFormData({...formData, season: e.target.value})}
                    placeholder="e.g., 2024"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-startDate">Start Date</Label>
                      <Input
                        id="edit-startDate"
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-endDate">End Date</Label>
                    <Input
                      id="edit-endDate"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter league description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleEditLeague}>
                  Update League
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}