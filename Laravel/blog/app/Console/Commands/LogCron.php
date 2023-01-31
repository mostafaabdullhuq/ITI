<?php

namespace App\Console\Commands;

use App\Jobs\PruneOldPostsJob;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Date;

class LogCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'log:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Log cron';
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        dispatch(
            new PruneOldPostsJob(
                Date::now()->subDays(365 * 2)
            )
        );

        return Command::SUCCESS;
    }
}