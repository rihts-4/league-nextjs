// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { Layout } from '@/components/Layout';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Trophy, Users, Calendar, ArrowRight, Medal, Zap } from 'lucide-react';

// export default function HomePage() {
//   return (
//     <Layout>
//       <div className="relative">
//         {/* Hero Section */}
//         <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
//           <div className="absolute inset-0 bg-black/20"></div>
//           <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center">
//               <h1 className="text-4xl md:text-6xl font-bold mb-6">
//                 Everything Sports
//                 <span className="block text-blue-200">Leagues</span>
//               </h1>
//               <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
//                 Experience the ultimate sports league platform with comprehensive team management, 
//                 live scoring, and detailed analytics
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link href="/leagues">
//                   <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
//                     <Trophy className="mr-2 h-5 w-5" />
//                     View Leagues
//                   </Button>
//                 </Link>
//                 <Link href="/teams">
//                   <Button size="lg" variant="outline" className="border-white text-blue-600 bg-white hover:bg-blue-50">
//                     <Users className="mr-2 h-5 w-5" />
//                     Browse Teams
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Stats Section */}
//         {/* <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               <div className="text-center">
//                 <div className="flex justify-center mb-4">
//                   <div className="bg-blue-100 p-3 rounded-full">
//                     <Trophy className="h-8 w-8 text-blue-600" />
//                   </div>
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-900">12+</h3>
//                 <p className="text-gray-600">Active Leagues</p>
//               </div>
//               <div className="text-center">
//                 <div className="flex justify-center mb-4">
//                   <div className="bg-green-100 p-3 rounded-full">
//                     <Users className="h-8 w-8 text-green-600" />
//                   </div>
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-900">150+</h3>
//                 <p className="text-gray-600">Teams</p>
//               </div>
//               <div className="text-center">
//                 <div className="flex justify-center mb-4">
//                   <div className="bg-orange-100 p-3 rounded-full">
//                     <Calendar className="h-8 w-8 text-orange-600" />
//                   </div>
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-900">500+</h3>
//                 <p className="text-gray-600">Games Played</p>
//               </div>
//               <div className="text-center">
//                 <div className="flex justify-center mb-4">
//                   <div className="bg-purple-100 p-3 rounded-full">
//                     <Target className="h-8 w-8 text-purple-600" />
//                   </div>
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-900">1000+</h3>
//                 <p className="text-gray-600">Players</p>
//               </div>
//             </div>
//           </div>
//         </section> */}

//         {/* Features Section */}
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Everything You Need to Manage Sports Leagues
//               </h2>
//               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                 From team registration to championship tracking, our platform provides all the tools 
//                 you need for professional sports league management.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//                 <CardHeader>
//                   <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
//                     <Trophy className="h-8 w-8 text-blue-600" />
//                   </div>
//                   <CardTitle className="text-xl">League Management</CardTitle>
//                   <CardDescription>
//                     Create and manage multiple leagues with customizable rules, schedules, and standings.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <div className="flex items-center text-sm text-gray-600">
//                       <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
//                       Season scheduling
//                     </div>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
//                       Automated standings
//                     </div>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
//                       Custom rules engine
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//                 <CardHeader>
//                   <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
//                     <Users className="h-8 w-8 text-green-600" />
//                   </div>
//                   <CardTitle className="text-xl">Team & Player Tracking</CardTitle>
//                   <CardDescription>
//                     Complete roster management with detailed player statistics and performance analytics.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <div className="flex items-center text-sm text-gray-600">
//                       <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
//                       Player profiles
//                     </div>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
//                       Performance metrics
//                     </div>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
//                       Team statistics
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
//                 <CardHeader>
//                   <div className="bg-orange-100 p-3 rounded-full w-fit mb-4">
//                     <Calendar className="h-8 w-8 text-orange-600" />
//                   </div>
//                   <CardTitle className="text-xl">Game Scheduling</CardTitle>
//                   <CardDescription>
//                     Automated scheduling system with conflict detection and venue management.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <div className="flex items-center text-sm text-gray-600">
//                       <ArrowRight className="h-4 w-4 mr-2 text-orange-600" />
//                       Smart scheduling
//                     </div>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <ArrowRight className="h-4 w-4 mr-2 text-orange-600" />
//                       Venue booking
//                     </div>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <ArrowRight className="h-4 w-4 mr-2 text-orange-600" />
//                       Live score updates
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </section>

//         {/* Recent Games Section */}
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-900">Recent Games</h2>
//               <Link href="/games">
//                 <Button variant="outline">
//                   View All Games
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <Card className="hover:shadow-lg transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <Badge variant="secondary">Completed</Badge>
//                     <span className="text-sm text-gray-500">Mar 15, 2024</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="text-center">
//                       <h3 className="font-semibold">Thunder Bolts</h3>
//                       <p className="text-2xl font-bold text-blue-600">2</p>
//                     </div>
//                     <div className="text-center">
//                       <span className="text-gray-400">vs</span>
//                     </div>
//                     <div className="text-center">
//                       <h3 className="font-semibold">Fire Eagles</h3>
//                       <p className="text-2xl font-bold text-red-600">1</p>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
//                     <Medal className="h-4 w-4 mr-1" />
//                     Central Stadium
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="hover:shadow-lg transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <Badge variant="outline">Scheduled</Badge>
//                     <span className="text-sm text-gray-500">Mar 22, 2024</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="text-center">
//                       <h3 className="font-semibold">Fire Eagles</h3>
//                       <p className="text-lg text-gray-400">-</p>
//                     </div>
//                     <div className="text-center">
//                       <span className="text-gray-400">vs</span>
//                     </div>
//                     <div className="text-center">
//                       <h3 className="font-semibold">Thunder Bolts</h3>
//                       <p className="text-lg text-gray-400">-</p>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
//                     <Zap className="h-4 w-4 mr-1" />
//                     Sports Complex
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="hover:shadow-lg transition-shadow border-2 border-green-200 bg-green-50">
//                 <CardContent className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <Badge className="bg-green-100 text-green-800">Live</Badge>
//                     <span className="text-sm text-gray-500">Now</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="text-center">
//                       <h3 className="font-semibold">Storm Hawks</h3>
//                       <p className="text-2xl font-bold text-green-600">85</p>
//                     </div>
//                     <div className="text-center">
//                       <span className="text-gray-400">vs</span>
//                     </div>
//                     <div className="text-center">
//                       <h3 className="font-semibold">Lightning</h3>
//                       <p className="text-2xl font-bold text-green-600">78</p>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex items-center justify-center text-sm text-green-600 font-medium">
//                     <div className="animate-pulse mr-2 h-2 w-2 bg-green-600 rounded-full"></div>
//                     Q3 - 8:24 remaining
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Ready to Transform Your League?
//             </h2>
//             <p className="text-xl mb-8 text-blue-100">
//               Join thousands of sports organizations using our platform to manage their leagues professionally.
//             </p>
//             <Link href="/login">
//               <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
//                 Get Started Today
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </Link>
//           </div>
//         </section>
//       </div>
//     </Layout>
//   );
// }

'use client';

import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, Calendar, ArrowRight, Medal, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Everything Sports
                <span className="block text-blue-200">Leagues</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Follow your favorite teams, track live scores, and stay connected with 
                all the action from your local sports leagues
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/leagues">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    <Trophy className="mr-2 h-5 w-5" />
                    Explore Leagues
                  </Button>
                </Link>
                <Link href="/teams">
                  <Button size="lg" variant="outline" className="border-white text-blue-600 bg-white hover:bg-blue-50">
                    <Users className="mr-2 h-5 w-5" />
                    Find Your Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Trophy className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">12+</h3>
                <p className="text-gray-600">Active Leagues</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">150+</h3>
                <p className="text-gray-600">Teams</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">500+</h3>
                <p className="text-gray-600">Games Played</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">1000+</h3>
                <p className="text-gray-600">Players</p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Follow Your Favorite Sports
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get real-time updates, detailed stats, and never miss a moment of the action 
                from your local sports leagues and favorite teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                    <Trophy className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">League Standings</CardTitle>
                  <CardDescription>
                    Stay up-to-date with real-time standings, playoff races, and championship battles.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                      Live standings updates
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                      Playoff predictions
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                      Season highlights
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Team & Player Stats</CardTitle>
                  <CardDescription>
                    Dive deep into player performances, team records, and detailed statistics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
                      Player leaderboards
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
                      Team comparisons
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
                      Historical records
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="bg-orange-100 p-3 rounded-full w-fit mb-4">
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Live Scores & Schedule</CardTitle>
                  <CardDescription>
                    Follow games as they happen and never miss your team's next matchup.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 mr-2 text-orange-600" />
                      Real-time scoring
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 mr-2 text-orange-600" />
                      Game notifications
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 mr-2 text-orange-600" />
                      Upcoming games
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recent Games Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Recent Games</h2>
              <Link href="/games">
                <Button variant="outline">
                  View All Games
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary">Final</Badge>
                    <span className="text-sm text-gray-500">Mar 15, 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <h3 className="font-semibold">Thunder Bolts</h3>
                      <p className="text-2xl font-bold text-blue-600">2</p>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-400">vs</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">Fire Eagles</h3>
                      <p className="text-2xl font-bold text-red-600">1</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                    <Medal className="h-4 w-4 mr-1" />
                    Central Stadium
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="outline">Upcoming</Badge>
                    <span className="text-sm text-gray-500">Mar 22, 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <h3 className="font-semibold">Fire Eagles</h3>
                      <p className="text-lg text-gray-400">-</p>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-400">vs</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">Thunder Bolts</h3>
                      <p className="text-lg text-gray-400">-</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                    <Zap className="h-4 w-4 mr-1" />
                    Sports Complex
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-2 border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Badge className="bg-green-100 text-green-800">Live</Badge>
                    <span className="text-sm text-gray-500">Now</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <h3 className="font-semibold">Storm Hawks</h3>
                      <p className="text-2xl font-bold text-green-600">85</p>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-400">vs</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">Lightning</h3>
                      <p className="text-2xl font-bold text-green-600">78</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center text-sm text-green-600 font-medium">
                    <div className="animate-pulse mr-2 h-2 w-2 bg-green-600 rounded-full"></div>
                    Q3 - 8:24 remaining
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Miss a Game Again
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of fans who stay connected to their favorite teams and players.
            </p>
            <Link href="/login">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Following Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}