import { useState, type ReactNode } from 'react'
import { checkForUpdates, setUpdateModalOpen, useReleaseUpdates } from '../../hooks/useReleaseUpdates'
import { compareVersions, MANUAL_CHECK_MIN_INTERVAL_MS } from '../../lib/releaseUpdates'
import { useStore } from '../../store'
import { ChevronRightIcon, ExternalLinkIcon, GithubIcon, HistoryIcon, RefreshIcon } from '../icons'

interface AboutRowProps {
  icon: ReactNode
  title: string
  subtitle?: string
  right?: ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  highlight?: boolean
}

/** 列表中的一行：有 href 时为外链，否则为按钮 */
function AboutRow({ icon, title, subtitle, right, href, onClick, disabled, highlight }: AboutRowProps) {
  const className = `flex min-h-[56px] w-full items-center gap-3 px-4 py-2.5 text-left outline-none transition-colors disabled:cursor-default ${highlight ? 'bg-blue-500/[0.08] hover:bg-blue-500/[0.12] focus-visible:bg-blue-500/[0.12] dark:bg-blue-500/[0.12] dark:hover:bg-blue-500/[0.16] dark:focus-visible:bg-blue-500/[0.16]' : 'hover:bg-black/[0.03] focus-visible:bg-black/[0.03] dark:hover:bg-white/[0.04] dark:focus-visible:bg-white/[0.04]'}`
  const content = (
    <>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${highlight ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 shadow-sm dark:bg-white/[0.08] dark:text-gray-300 dark:shadow-none'}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-sm ${highlight ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-100'}`}>{title}</span>
        {subtitle && <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>}
      </span>
      {right}
    </>
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={className}>
      {content}
    </button>
  )
}

/** 设置页样式的卡片：标题行下是以细线分隔的若干行 */
function AboutCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-transparent bg-black/[0.04] dark:bg-white/[0.06]">
      <div className="flex items-center gap-2 px-4 pb-1 pt-4 text-gray-700 dark:text-gray-300">
        {icon}
        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100">{title}</h4>
      </div>
      <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">{children}</div>
    </div>
  )
}

const CHEVRON = <ChevronRightIcon className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
const EXTERNAL = <ExternalLinkIcon className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />

export default function AboutSettingsTab({ onOpenFontLicenses }: { onOpenFontLicenses: () => void }) {
  const showToast = useStore((s) => s.showToast)
  const latest = useReleaseUpdates((s) => s.releases[0])
  const checkError = useReleaseUpdates((s) => s.checkError)
  const [checking, setChecking] = useState(false)

  const handleCheck = async () => {
    setChecking(true)
    try {
      // 手动检查只复用一分钟内的缓存；有新版本时直接打开更新弹窗（即使该版本已被忽略）
      const next = await checkForUpdates(MANUAL_CHECK_MIN_INTERVAL_MS)
      if (next && compareVersions(next.version, __APP_VERSION__) > 0) setUpdateModalOpen(true)
      else showToast('已是最新版本', 'success')
    } catch (err) {
      showToast(`检查更新失败：${err instanceof Error ? err.message : String(err)}`, 'error')
    } finally {
      setChecking(false)
    }
  }

  const hasUpdate = Boolean(latest && compareVersions(latest.version, __APP_VERSION__) > 0)
  const checkStatus = checking ? (
    <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">正在检查…</span>
  ) : checkError ? (
    <span className="shrink-0 text-xs text-red-500 dark:text-red-400">检查失败</span>
  ) : latest ? (
    <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">已是最新版本</span>
  ) : null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-2xl border border-transparent bg-black/[0.04] p-4 dark:bg-white/[0.06]">
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-bold text-gray-800 dark:text-gray-100">
            <a
              href="https://yuangeluyou.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded outline-none underline-offset-2 hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              鑫源AI画图
            </a>
          </h4>
          <p className="mt-0.5 text-[13px] text-gray-500 dark:text-gray-400">鑫源AI 官方画图工具</p>
          <p data-selectable-text className="mt-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            仅支持本地部署：Windows 桌面客户端与 Docker。所有记录与图片只保存在本机。
          </p>
        </div>
        <a
          href="https://github.com/YUANGEGE1234/xinyuan-ai-huatu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 仓库"
          title="GitHub 仓库"
          className="shrink-0 rounded-lg p-1 text-gray-400 outline-none transition-colors hover:text-gray-700 focus-visible:text-gray-700 focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-gray-500 dark:hover:text-gray-200 dark:focus-visible:text-gray-200"
        >
          <GithubIcon className="h-6 w-6" />
        </a>
      </div>

      <AboutCard icon={<RefreshIcon className="h-4 w-4" />} title="版本与更新">
        {hasUpdate && !checking ? (
          <AboutRow
            highlight
            icon={<RefreshIcon className="h-4 w-4" />}
            title="发现新版本"
            subtitle={`当前版本 v${__APP_VERSION__}`}
            onClick={() => setUpdateModalOpen(true)}
            right={(
              <span className="flex shrink-0 items-center gap-1">
                <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">{latest?.tag}</span>
                <ChevronRightIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              </span>
            )}
          />
        ) : (
          <AboutRow
            icon={<RefreshIcon className={`h-4 w-4 ${checking ? 'animate-spin' : ''}`} />}
            title="检查更新"
            subtitle={checkError && !checking ? checkError : `当前版本 v${__APP_VERSION__}`}
            onClick={() => void handleCheck()}
            disabled={checking}
            right={checkStatus}
          />
        )}
        <AboutRow
          icon={<HistoryIcon className="h-4 w-4" />}
          title="更新日志"
          onClick={() => setUpdateModalOpen(true)}
          right={CHEVRON}
        />
      </AboutCard>

      <AboutCard
        icon={(
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
        title="支持与反馈"
      >
        <AboutRow
          icon={(
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
          title="反馈问题"
          href="https://github.com/YUANGEGE1234/xinyuan-ai-huatu/issues"
          right={EXTERNAL}
        />
        <AboutRow
          icon={(
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 2.7 4 6.2 4 10s-1.5 7.3-4 10m0-20c-2.5 2.7-4 6.2-4 10s1.5 7.3 4 10M2.5 9h19M2.5 15h19" />
            </svg>
          )}
          title="鑫源AI 官网"
          subtitle="注册账号、创建令牌与查看模型列表"
          href="https://yuangeluyou.com/"
          right={EXTERNAL}
        />
      </AboutCard>

      <div className="overflow-hidden rounded-2xl border border-transparent bg-black/[0.04] dark:bg-white/[0.06]">
        <AboutRow
          icon={(
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
          title="字体与第三方许可"
          subtitle="本软件使用 HarmonyOS Sans SC 与 Maple Mono NF CN 字体"
          onClick={onOpenFontLicenses}
          right={CHEVRON}
        />
      </div>
    </div>
  )
}
