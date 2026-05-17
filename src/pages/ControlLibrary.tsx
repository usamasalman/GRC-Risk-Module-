import { useData } from '@/store/DataContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ControlLibrary() {
  const { controls } = useData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center sm:flex-row flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Control Library</h2>
          <p className="text-sm text-slate-500">Repository of all organizational mitigating controls.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Control
        </Button>
      </div>

      <div className="bg-white rounded-md border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Control Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Nature</TableHead>
              <TableHead>Design Eff.</TableHead>
              <TableHead>Operating Eff.</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {controls.map((control) => (
              <TableRow key={control.id}>
                <TableCell className="font-medium">{control.code}</TableCell>
                <TableCell>{control.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{control.type}</Badge>
                </TableCell>
                <TableCell>{control.nature}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${control.designEffectiveness * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-500">{control.designEffectiveness * 100}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${control.operatingEffectiveness * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-500">{control.operatingEffectiveness * 100}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
