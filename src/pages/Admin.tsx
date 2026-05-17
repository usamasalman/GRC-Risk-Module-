import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, Plus, MoreHorizontal, ChevronRight, LayoutDashboard, Database, FileText, CheckSquare, ShieldQuestion, Users, Key, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Admin() {
  const departments = [
    { name: 'Underwriting', division: 'ABC Limited', owner: 'Junaid Ahmed', created: '07/09/2025 7:55 AM', updated: '08/04/2025 6:36 AM' },
    { name: 'Treasury & Cash Management', division: 'ABC Limited', owner: 'Junaid Ahmed, Ahsan', created: '05/21/2025 5:52 AM', updated: '06/11/2025 12:00 PM' },
    { name: 'Regulatory & Compliance Department', division: 'ABC Limited', owner: 'Junaid Ahmed, Ahsan', created: '05/21/2025 7:23 AM', updated: '05/21/2025 8:45 AM' },
    { name: 'Legal Department', division: 'ABC Limited', owner: 'Junaid Ahmed', created: '05/21/2025 12:57 PM', updated: '05/21/2025 12:57 PM' },
    { name: 'Information Security (Cybersecurity) Department', division: 'ABC Limited', owner: 'Khalid Al Dailah', created: '05/21/2025 7:23 AM', updated: '05/21/2025 8:45 AM' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
          Admin Center
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
         {/* Sidebar Menu */}
         <div className="w-full lg:w-64 bg-white rounded-md border shadow-sm shrink-0 overflow-hidden">
            <div className="p-3">
               <button className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-md">
                  <LayoutDashboard className="w-4 h-4" /> Organization Setup
               </button>
               <button className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                  <Database className="w-4 h-4" /> Risk Master Data
               </button>
               <button className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                  <FileText className="w-4 h-4" /> Control Parameters
               </button>
               <button className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                  <Users className="w-4 h-4" /> People
               </button>
               <button className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                  <Key className="w-4 h-4" /> Roles & Privileges
               </button>
               <button className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                  <CheckSquare className="w-4 h-4" /> Approvals
               </button>
               <button className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                  <FileText className="w-4 h-4" /> Documents
               </button>
               <button className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                  <ShieldQuestion className="w-4 h-4" /> Assessment Period
               </button>
               <button className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                  <Settings className="w-4 h-4" /> Security
               </button>
            </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 space-y-4">
            <div className="bg-white p-4 rounded-md border shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                     <button className="text-slate-400 hover:text-slate-700">
                        <ChevronRight className="w-5 h-5 rotate-180" />
                     </button>
                     <h3 className="text-lg font-semibold text-slate-800">Organization Setup</h3>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="relative">
                        <input type="text" placeholder="Search" className="w-48 pl-8 pr-4 py-1.5 border rounded-md text-sm bg-slate-50 border-slate-200" />
                        <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-400" />
                     </div>
                     <Button variant="outline" size="sm" className="h-8">Manage Columns</Button>
                     <Button size="sm" className="bg-[#1e293b] h-8 text-xs">
                        <Plus className="w-3 h-3 mr-1"/> Add New
                     </Button>
                  </div>
               </div>

               <div className="mb-4 space-x-2">
                  <button className="px-4 py-1 border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full">Division</button>
                  <button className="px-4 py-1 border border-[#1e293b] bg-[#1e293b] text-white text-sm font-medium rounded-full">Department</button>
               </div>

               <div className="border rounded-md overflow-hidden">
                   <div className="overflow-x-auto">
                     <Table>
                        <TableHeader className="bg-[#1e293b] text-white">
                           <TableRow className="hover:bg-[#1e293b]">
                              <TableHead className="text-slate-200 font-medium">Name</TableHead>
                              <TableHead className="text-slate-200 font-medium">Division</TableHead>
                              <TableHead className="text-slate-200 font-medium">Risk Owner</TableHead>
                              <TableHead className="text-slate-200 font-medium">Created On</TableHead>
                              <TableHead className="text-slate-200 font-medium">Last Updated</TableHead>
                              <TableHead className="text-slate-200 font-medium text-right">Actions</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {departments.map((dept, idx) => (
                              <TableRow key={idx}>
                                 <TableCell className="text-xs text-indigo-600 font-medium cursor-pointer hover:underline">{dept.name}</TableCell>
                                 <TableCell className="text-xs text-slate-600">{dept.division}</TableCell>
                                 <TableCell className="text-xs">
                                    <div className="flex items-center gap-1">
                                       <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-[10px] font-bold">
                                          {dept.owner.charAt(0)}
                                       </div>
                                       {dept.owner.includes(',') && (
                                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold -ml-2 border border-white">
                                             A
                                          </div>
                                       )}
                                    </div>
                                 </TableCell>
                                 <TableCell className="text-xs text-slate-500">{dept.created}</TableCell>
                                 <TableCell className="text-xs text-slate-500">{dept.updated}</TableCell>
                                 <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                       <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                    </Button>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
