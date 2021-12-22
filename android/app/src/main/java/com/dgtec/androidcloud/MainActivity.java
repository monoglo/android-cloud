package com.dgtec.androidcloud;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onResume() {
        super.onResume();
        try {
            Intent in = getIntent();
            Uri data = in.getData();
            System.out.println("deeplinkingcallback   :- "+data);
        } catch (Exception ignored) {

        }
    }
}
