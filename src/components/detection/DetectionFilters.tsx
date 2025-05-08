
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DetectionFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  animalFilter: string;
  setAnimalFilter: (value: string) => void;
  cameraFilter: string;
  setCameraFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  confidenceThreshold: number[];
  setConfidenceThreshold: (value: number[]) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  resetFilters: () => void;
  uniqueAnimalClasses: string[];
  uniqueCameras: string[];
}

const DetectionFilters = ({
  searchQuery,
  setSearchQuery,
  animalFilter,
  setAnimalFilter,
  cameraFilter,
  setCameraFilter,
  dateFilter,
  setDateFilter,
  confidenceThreshold,
  setConfidenceThreshold,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  resetFilters,
  uniqueAnimalClasses,
  uniqueCameras
}: DetectionFiltersProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input 
              id="search"
              placeholder="Search detections..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="animal-filter">Animal Type</Label>
            <Select value={animalFilter} onValueChange={setAnimalFilter}>
              <SelectTrigger id="animal-filter">
                <SelectValue placeholder="All Animals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Animals</SelectItem>
                {uniqueAnimalClasses.map(animal => (
                  <SelectItem key={animal} value={animal}>
                    {animal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="camera-filter">Camera</Label>
            <Select value={cameraFilter} onValueChange={setCameraFilter}>
              <SelectTrigger id="camera-filter">
                <SelectValue placeholder="All Cameras" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cameras</SelectItem>
                {uniqueCameras.map(camera => (
                  <SelectItem key={camera} value={camera}>
                    {camera}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="date-filter">Date Range</Label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger id="date-filter">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="confidence-slider">Confidence Threshold: {confidenceThreshold[0]}%</Label>
            </div>
            <Slider 
              id="confidence-slider"
              defaultValue={[70]} 
              max={100} 
              step={1}
              value={confidenceThreshold}
              onValueChange={setConfidenceThreshold}
            />
          </div>
        </div>
        
        {dateFilter === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="start-date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="end-date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick an end date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={date => startDate ? date < startDate : false}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" className="mr-2" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button>
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetectionFilters;
