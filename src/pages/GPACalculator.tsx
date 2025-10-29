import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import SEO from "@/components/SEO";

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "", grade: "", credits: "" }
  ]);
  const [gpa, setGpa] = useState<number | null>(null);

  const gradePoints: { [key: string]: number } = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "F": 0.0
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: "", grade: "", credits: "" }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.grade && course.credits) {
        const credits = parseFloat(course.credits);
        const points = gradePoints[course.grade];
        totalPoints += points * credits;
        totalCredits += credits;
      }
    });

    const calculatedGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setGpa(calculatedGPA);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GPA Calculator",
    "description": "Calculate your GPA online, free college and high school grade point average calculator",
    "url": "https://zouhourab1996-stack.github.io/web-utility-spark/#/gpa-calculator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any"
  };

  return (
    <>
      <SEO
        title="GPA Calculator — Calculate Your Grade Point Average"
        description="Free online GPA calculator for college and high school. Calculate your semester or cumulative grade point average easily."
        keywords="GPA calculator, grade point average, college GPA, high school GPA, semester GPA, cumulative GPA, online calculator"
        canonical="/#/gpa-calculator"
        schema={schema}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <GraduationCap className="w-10 h-10 mr-3 text-primary" />
              GPA Calculator
            </h1>
            <p className="text-lg text-muted-foreground">
              Calculate your Grade Point Average for semester or cumulative
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enter Your Courses</CardTitle>
              <CardDescription>Add course grades and credits to calculate GPA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {courses.map((course, index) => (
                <div key={course.id} className="p-4 border rounded-lg space-y-4 bg-secondary/50">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Course {index + 1}</Label>
                    {courses.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCourse(course.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Course Name</Label>
                      <Input
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                        placeholder="e.g., Mathematics"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Grade</Label>
                      <Select
                        value={course.grade}
                        onValueChange={(value) => updateCourse(course.id, "grade", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(gradePoints).map(grade => (
                            <SelectItem key={grade} value={grade}>
                              {grade} ({gradePoints[grade].toFixed(1)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Credits</Label>
                      <Input
                        type="number"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                        placeholder="e.g., 3"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={addCourse} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Another Course
              </Button>

              <Button onClick={calculateGPA} className="w-full gradient-primary text-white">
                Calculate GPA
              </Button>

              {gpa !== null && (
                <div className="p-6 bg-primary/10 rounded-lg text-center">
                  <h3 className="text-xl font-semibold mb-2">Your GPA</h3>
                  <p className="text-4xl font-bold text-primary">{gpa.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Out of 4.0 scale
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GPACalculator;
