import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Filter, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function KRIs() {
  const kris = [
    { id: 'K-45', riskCode: 'R-161', title: 'Policies renewal proc...', indicator: 'Details of stat...', formula: 'defined', red: '0-20', amber: '20-60', green: '60-100', actual: '39.01', progress: 100, stage: 'Monitoring' },
    { id: 'K-44', riskCode: 'R-159', title: 'Inadequate Succession...', indicator: 'N/A', formula: 'N/A', red: '0-0', amber: '0-0', green: '0-0', actual: '0', progress: 50, stage: 'Monitoring' },
    { id: 'K-43', riskCode: 'R-151', title: 'Shortage of UI/UX', indicator: 'Percentage d...', formula: '(Actual Spend - Budge...', red: '0-2', amber: '3-7', green: '8-11', actual: '11', progress: 40, stage: 'Monitoring' },
    { id: 'K-42', riskCode: 'R-146', title: 'Risk of Fire', indicator: 'Percentage d...', formula: '(Actual Spend - Budge...', red: '10-15', amber: '20-25', green: '30-40', actual: '55', progress: 100, stage: 'Monitoring' },
    { id: 'K-41', riskCode: 'R-141', title: 'Monthly Operations Bu...', indicator: 'Percentage d...', formula: '(Actual Spend - Budge...', red: '100-110', amber: '101-110', green: '90-99', actual: '101', progress: 20, stage: 'Monitoring' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
          KRIs
        </h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input type="text" placeholder="Search" className="w-full pl-8 pr-4 py-2 border rounded-md text-sm bg-white" />
            <svg className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button className="bg-[#1e293b]">
            <Plus className="mr-2 h-4 w-4" /> Create Risk
          </Button>
        </div>
      </div>

      <Card className="rounded-md border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[1000px]">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[100px]">KRI Code</TableHead>
                <TableHead>Risk Code</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Indicator</TableHead>
                <TableHead>Formula</TableHead>
                <TableHead>Red</TableHead>
                <TableHead>Amber</TableHead>
                <TableHead>Green</TableHead>
                <TableHead>Actual Value</TableHead>
                <TableHead>Treatment Progress</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kris.map((kri) => (
                <TableRow key={kri.id}>
                  <TableCell className="font-medium text-xs">{kri.id}</TableCell>
                  <TableCell className="text-indigo-600 text-xs underline cursor-pointer hover:text-indigo-800">{kri.riskCode}</TableCell>
                  <TableCell className="text-xs truncate max-w-[150px]">{kri.title}</TableCell>
                  <TableCell className="text-xs text-slate-500">{kri.indicator}</TableCell>
                  <TableCell className="text-xs text-slate-500 truncate max-w-[150px]">{kri.formula}</TableCell>
                  <TableCell className="text-xs">{kri.red}</TableCell>
                  <TableCell className="text-xs">{kri.amber}</TableCell>
                  <TableCell className="text-xs">{kri.green}</TableCell>
                  <TableCell className="text-xs font-semibold text-yellow-600">{kri.actual}</TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                           <div className="bg-blue-500 h-full" style={{ width: `${kri.progress}%` }}></div>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500 w-8">{kri.progress}%</span>
                     </div>
                  </TableCell>
                  <TableCell>
                     <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] font-normal px-2 py-0">
                        {kri.stage}
                     </Badge>
                  </TableCell>
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
      </Card>
    </div>
  );
}
