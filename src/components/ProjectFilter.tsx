"use client";

import {useState, ReactNode} from "react";

export type FilterableItem = {
    project?: string;
};

export function ProjectFilter({
    items,
    children,
    itemLabel = "作品",
    gridCols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
}: {
    items: FilterableItem[];
    children: ReactNode[];
    itemLabel?: string;
    gridCols?: string;
}) {
    const [selectedProject, setSelectedProject] = useState<string | "all">("all");

    // プロジェクトのリストを取得
    const projects = Array.from(new Set(items.map(item => item.project).filter(Boolean))) as string[];

    // フィルタリング
    const filteredIndices = selectedProject === "all"
        ? items.map((_, i) => i)
        : items.map((item, i) => item.project === selectedProject ? i : -1).filter(i => i !== -1);

    return (
        <div>
            {/* フィルタボタン */}
            {projects.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    <button
                        onClick={() => setSelectedProject("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            selectedProject === "all"
                                ? "bg-accentBlue/20 border-2 border-accentBlue text-accentBlue"
                                : "bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-gray-600"
                        }`}
                    >
                        すべて
                    </button>
                    {projects.map(project => (
                        <button
                            key={project}
                            onClick={() => setSelectedProject(project)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                selectedProject === project
                                    ? "bg-accentBlue/20 border-2 border-accentBlue text-accentBlue"
                                    : "bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-gray-600"
                            }`}
                        >
                            {project}
                        </button>
                    ))}
                </div>
            )}

            {/* 表示件数 */}
            <div className="text-center text-sm text-gray-400 mb-4">
                {filteredIndices.length}件の{selectedProject === "all" ? itemLabel : `${selectedProject}の${itemLabel}`}
            </div>

            {/* アイテム一覧 */}
            <div className={`grid ${gridCols} gap-4`}>
                {filteredIndices.map(i => children[i])}
            </div>
        </div>
    );
}
