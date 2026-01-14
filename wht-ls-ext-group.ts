#!/usr/bin/env bun

import { readdir, stat } from "node:fs/promises";
import { extname } from "node:path";

// ファイルを拡張子ごとにグルーピング
const files = await readdir(".");

const grouped = new Map<string, string[]>();

for (const file of files) {
  // 隠しファイルをスキップ
  if (file.startsWith(".")) continue;
  
  // ディレクトリをスキップ
  const fileStat = await stat(file);
  if (fileStat.isDirectory()) continue;
  
  const ext = extname(file) || "(no extension)";
  
  if (!grouped.has(ext)) {
    grouped.set(ext, []);
  }
  grouped.get(ext)!.push(file);
}

// 拡張子でソート
const sortedExts = Array.from(grouped.keys()).sort();

// 出力
for (const ext of sortedExts) {
  console.log(`${ext}:`);
  
  const fileList = grouped.get(ext)!;
  // ファイル名を横並びで表示（タブ区切り）
  console.log(fileList.join("\t"));
  console.log(); // 空行
}
