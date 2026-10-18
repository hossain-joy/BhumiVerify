import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCcw, Home, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('BhumiVerify Uncaught Error Caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetCache = () => {
    try {
      localStorage.removeItem('bhumiverify_saved_checks');
      localStorage.removeItem('bhumiverify_notifications');
    } catch {
      // ignore
    }
    window.location.href = '/dashboard';
  };

  private handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-2xl border border-rose-200 shadow-lg p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-slate-900">
                  {this.props.fallbackTitle || 'একটি অপ্রত্যাশিত ত্রুটি ঘটেছে / Unexpected Error'}
                </h1>
                <p className="text-xs text-slate-600 leading-relaxed">
                  পৃষ্ঠাটি লোড করার সময় একটি ত্রুটি ঘটেছে। আপনার ডেটা নিরাপদ রয়েছে। অনুগ্রহ করে নিচে দেয়া অপশনগুলোর মাধ্যমে পুনরায় চেষ্টা করুন।
                </p>
                <p className="text-xs text-slate-400">
                  An error occurred while rendering this view. You can reload the page or reset the local cache.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={this.handleReload}
                className="btn-primary text-xs py-2 px-4 font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>পৃষ্ঠা রিলোড করুন (Reload)</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="btn-secondary text-xs py-2 px-3.5 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>ড্যাশবোর্ডে যান (Dashboard)</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetCache}
                className="text-xs py-2 px-3.5 text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Clears corrupted local storage keys and restarts"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ক্যাশ রিসেট ও মেরামত</span>
              </button>
            </div>

            {/* Collapsible Error Diagnostics */}
            <div className="border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                {this.state.showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>কারিগরী বিবরণ (Technical Diagnostic Details)</span>
              </button>

              {this.state.showDetails && (
                <div className="mt-2 p-3 bg-slate-900 text-slate-200 rounded-lg text-[10px] font-mono overflow-x-auto space-y-1">
                  <p className="text-rose-400 font-bold">{this.state.error?.toString()}</p>
                  {this.state.errorInfo?.componentStack && (
                    <pre className="text-slate-400 whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
