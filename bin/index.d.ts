#!/usr/bin/env node
declare const Command: any;
declare const getFiles: any;
declare const program: any;
interface OptsInterface {
    develop: boolean;
    HOST: string;
    PORT: string;
    build: boolean;
}
declare const opts: OptsInterface;
