"use client";

import { CourseCategory } from "@/generated/openapi-client";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Flag,
  MessageCircle,
  Paperclip,
  Users,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteHeader({
  categories,
}: {
  categories: CourseCategory[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const isSiteHeaderNeeded = !pathname.includes("/course/");

  if (!isSiteHeaderNeeded) return null;
  const isCategoryNeeded = pathname == "/" || pathname.includes("/courses");
  const isInstructorPage = pathname?.startsWith("/instructor");

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* 첫째 줄: 로고, 네비게이션, 지식공유, 아바타 */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/inflearn_public_logo.svg"
            alt="inflearn logo"
            width={120}
            height={40}
            className="h-10 w-auto"
            unoptimized
          />
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav className="flex items-center gap-6">
          <Link
            href="/lectures"
            className="flex items-center gap-1.5 text-gray-700 hover:text-green-600 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span className="font-bold">강의</span>
          </Link>
          <Link
            href="/challenge"
            className="flex items-center gap-1.5 text-gray-700 hover:text-green-600 transition-colors"
          >
            <Flag className="w-4 h-4" />
            <span className="font-bold">챌린지</span>
          </Link>
          <Link
            href="/mentoring"
            className="flex items-center gap-1.5 text-gray-700 hover:text-green-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-bold">멘토링</span>
          </Link>
          <Link
            href="/clip"
            className="flex items-center gap-1.5 text-gray-700 hover:text-green-600 transition-colors"
          >
            <Paperclip className="w-4 h-4" />
            <span className="font-bold">클립</span>
          </Link>
          <Link
            href="/community"
            className="flex items-center gap-1.5 text-gray-700 hover:text-green-600 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span className="font-bold">커뮤니티</span>
          </Link>
        </nav>

        {/* 오른쪽: 지식공유, 아바타 */}
        <div className="flex items-center gap-4">
          <Link
            href="/instructor"
            className="text-gray-700 hover:text-green-600 transition-colors"
          >
            지식공유
          </Link>
          <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* 둘째 줄: 검색 바 */}
      {!isInstructorPage && (
        <div className="container mx-auto px-4 py-3 border-t border-gray-100">
          <div className="flex items-center justify-center">
            <div
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-4xl px-4 py-2.5"
              style={{ width: "fit-content", minWidth: "400px" }}
            >
              <div className="flex items-center gap-1 text-gray-500">
                <Play className="w-4 h-4" />
                <ChevronLeft className="w-3 h-3" />
              </div>
              <input
                type="text"
                placeholder="AI 시대에 필요한 무기, 지금 배워보세요."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 min-w-0"
              />
              <button className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition-colors">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 셋째 줄: 슬라이드뷰 (배너) */}
      {!isInstructorPage && (
        <div className="container mx-auto px-4 py-4">
          <div className="relative w-full h-64 bg-green-800 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-lg mb-2">
                7년차 엔지니어 최나실 멘토와 함께하는
              </p>
              <p className="text-2xl font-bold mb-2">
                프론트엔드 개발자를 위한
              </p>
              <p className="text-xl">실무기반 소수정예 4주 챌린지</p>
            </div>
            {/* 슬라이더 네비게이션 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1">
                <div className="w-2 h-0.5 bg-white"></div>
                <div className="w-2 h-0.5 bg-white/50"></div>
                <div className="w-2 h-0.5 bg-white/50"></div>
              </div>
              <button className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 넷째 줄: 카테고리 리스트 */}
      <div className="container mx-auto px-4  ">
        {isCategoryNeeded && (
          <div className="flex items-center justify-center py-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/courses/${category.slug}`}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "flex flex-col items-center gap-1 whitespace-nowrap pb-2 transition-colors",
                  selectedCategory === category.id
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-700 hover:text-green-600"
                )}
              >
                <Grid3x3 className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
