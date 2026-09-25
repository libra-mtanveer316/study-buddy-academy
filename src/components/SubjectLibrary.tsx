import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Code2,
  Cpu,
  Layout,
  FileCode2,
  Boxes,
  Network,
  Binary,
  BarChart3,
  Sparkles,
  Sheet,
  Database,
  LineChart,
  Brain,
  Atom,
  Bot,
  Workflow,
  MessageSquareCode,
  Cog,
  Globe,
  ShieldCheck,
  Lock,
  Megaphone,
  Layers,
  HardDrive,
  Cloud,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  X
} from 'lucide-react';
import { ActiveTab, Subject } from '../types';
import { CATEGORIES } from '../data/subjects';

interface SubjectLibraryProps {
  subjects: Subject[];
  selectedSubjectId: string;
  subjectProgressMap: Record<string, number>;
  onSelectSubject: (subjectId: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const SubjectLibrary: React.FC<SubjectLibraryProps> = ({
  subjects,
  selectedSubjectId,
  subjectProgressMap,
  onSelectSubject,
  onNavigateTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'FileCode2': return <FileCode2 className="w-5 h-5" />;
      case 'Boxes': return <Boxes className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Binary': return <Binary className="w-5 h-5" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Sheet': return <Sheet className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'LineChart': return <LineChart className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Atom': return <Atom className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Workflow': return <Workflow className="w-5 h-5" />;
      case 'MessageSquareCode': return <MessageSquareCode className="w-5 h-5" />;
      case 'Cog': return <Cog className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Lock': return <Lock className="w-5 h-5" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5" />;
      case 'Cloud': return <Cloud className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const filteredSubjects = subjects.filter((subject) => {
    const matchesCategory =
      selectedCategory === 'All' || subject.category === selectedCategory;
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartStudy = (subjectId: string, destination: ActiveTab = 'flashcards') => {
    onSelectSubject(subjectId);
    onNavigateTab(destination);
  };

  return (
    <div id="subject-library-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="bg-white dark:bg-[#112D4E] rounded-2xl border border-[#DBE2EF] dark:border-[#1c3e66] p-6 sm:p-7 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#3F72AF] dark:text-[#DBE2EF] text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Curriculum Catalog</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#112D4E] dark:text-white tracking-tight">
              Subject Library
            </h2>
            <p className="text-xs sm:text-sm text-[#112D4E]/70 dark:text-[#DBE2EF]/80 mt-1 max-w-2xl">
              Select an academic track to load its interactive flashcards, practice quizzes, and curriculum assistant prompts.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#112D4E]/40 dark:text-[#DBE2EF]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="subject-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects or topics..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DBE2EF] dark:border-[#1c3e66] bg-[#F9F7F7] dark:bg-[#0e243e] text-[#112D4E] dark:text-white placeholder:text-[#112D4E]/40 dark:placeholder:text-[#DBE2EF]/50 focus:outline-none focus:ring-2 focus:ring-[#3F72AF] focus:bg-white dark:focus:bg-[#0e243e] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#112D4E]/50 dark:text-[#DBE2EF]/60 hover:text-[#112D4E] dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 mt-5 border-t border-[#DBE2EF] dark:border-[#1c3e66] scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#3F72AF] text-white shadow-xs'
                : 'bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66] text-[#112D4E]/75 dark:text-[#DBE2EF]/80 hover:bg-[#DBE2EF]/60 dark:hover:bg-[#1c3e66]'
            }`}
          >
            All Subjects ({subjects.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = subjects.filter((s) => s.category === cat).length;
            const isCatActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isCatActive
                    ? 'bg-[#3F72AF] text-white shadow-xs'
                    : 'bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66] text-[#112D4E]/75 dark:text-[#DBE2EF]/80 hover:bg-[#DBE2EF]/60 dark:hover:bg-[#1c3e66]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map((subject) => {
          const progress = subjectProgressMap[subject.id] ?? subject.progress;
          const isSelected = selectedSubjectId === subject.id;

          return (
            <div
              key={subject.id}
              id={`subject-card-${subject.id}`}
              className={`bg-white dark:bg-[#112D4E] rounded-2xl border p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isSelected
                  ? 'border-[#3F72AF] dark:border-[#3F72AF] ring-2 ring-[#3F72AF]/30'
                  : 'border-[#DBE2EF] dark:border-[#1c3e66] hover:border-[#3F72AF]/70'
              }`}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`p-3 rounded-xl border ${
                      isSelected
                        ? 'bg-[#3F72AF] text-white border-[#3F72AF] shadow-xs'
                        : 'bg-[#DBE2EF]/60 text-[#3F72AF] dark:bg-[#1c3e66] dark:text-[#DBE2EF] border-[#DBE2EF] dark:border-[#244b7a]'
                    }`}
                  >
                    {getIconComponent(subject.icon)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isSelected && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#DBE2EF]/70 text-[#112D4E] dark:bg-[#1c3e66] dark:text-[#DBE2EF] border border-[#3F72AF]/40">
                        Active
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-[#112D4E]/70 dark:text-[#DBE2EF]/70 px-2.5 py-0.5 rounded-md bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66] tabular-nums">
                      {subject.lessonsCount} lessons
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-[#112D4E] dark:text-white tracking-tight mb-1.5">
                  {subject.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#112D4E]/75 dark:text-[#DBE2EF]/80 line-clamp-2 mb-5 leading-relaxed">
                  {subject.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5 mb-5 p-3 rounded-xl bg-[#F9F7F7] dark:bg-[#0e243e] border border-[#DBE2EF] dark:border-[#1c3e66]">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#112D4E]/70 dark:text-[#DBE2EF]/80">Mastery</span>
                    <span className="text-[#3F72AF] dark:text-[#558bc9] font-bold tabular-nums font-mono">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#DBE2EF]/70 dark:bg-[#1c3e66] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] dark:from-[#3F72AF] dark:to-[#558bc9] rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#DBE2EF] dark:border-[#1c3e66] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleStartStudy(subject.id, 'flashcards')}
                    title="Study Flashcards"
                    className="px-2 py-1.5 rounded-lg text-[#112D4E]/70 dark:text-[#DBE2EF]/80 hover:bg-[#DBE2EF]/50 dark:hover:bg-[#1c3e66] hover:text-[#3F72AF] dark:hover:text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cards</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartStudy(subject.id, 'quiz')}
                    title="Take Quiz"
                    className="px-2 py-1.5 rounded-lg text-[#112D4E]/70 dark:text-[#DBE2EF]/80 hover:bg-[#DBE2EF]/50 dark:hover:bg-[#1c3e66] hover:text-[#3F72AF] dark:hover:text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Quiz</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartStudy(subject.id, 'chat')}
                    title="Ask AI Assistant"
                    className="px-2 py-1.5 rounded-lg text-[#112D4E]/70 dark:text-[#DBE2EF]/80 hover:bg-[#DBE2EF]/50 dark:hover:bg-[#1c3e66] hover:text-[#3F72AF] dark:hover:text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Chat</span>
                  </button>
                </div>

                <button
                  type="button"
                  id={`btn-select-subject-${subject.id}`}
                  onClick={() => handleStartStudy(subject.id, 'flashcards')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-[0.97] ${
                    isSelected
                      ? 'bg-[#3F72AF] text-white hover:bg-[#315d91]'
                      : 'bg-[#DBE2EF]/60 dark:bg-[#1c3e66] text-[#112D4E] dark:text-[#DBE2EF] border border-[#DBE2EF] dark:border-[#244b7a] hover:bg-[#DBE2EF] dark:hover:bg-[#244b7a]'
                  }`}
                >
                  <span>{isSelected ? 'Continue' : 'Start'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
